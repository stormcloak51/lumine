import { Chat, Message } from '@/prisma/__generated__/edge'
import { PrismaService } from '@/src/infrastructure/prisma/prisma.service'
import { RedisService } from '@/src/infrastructure/redis/redis.service'
import { Injectable } from '@nestjs/common'
import { EventEmitter2 } from '@nestjs/event-emitter'

@Injectable()
export class ChatService {
	constructor(
		private readonly redisService: RedisService,
		private readonly prisma: PrismaService,
		private readonly eventEmitter: EventEmitter2
	) {}

	async getChats(userId: string, page = 1, limit = 30) {
		// Минимальное кэширование - 5 секунд
		const cacheKey = `chats:${userId}:page:${page}:limit:${limit}`
		const cachedChats = await this.redisService.get<Chat[]>(cacheKey)
		
		if (cachedChats) {
			console.log('Cache hit for', cacheKey);
			return cachedChats;
		}
	
		console.log('Cache miss for', cacheKey);
		
		const chats = await this.prisma.chat.findMany({
			where: { 
				members: { some: { id: userId } } 
			},
			include: {
				members: {
					select: {
						id: true,
						name: true,
						surname: true,
						username: true,
						userAvatar: true
					}
				},
				messages: {
					orderBy: {
						createdAt: 'desc'
					},
					take: 1
				}
			},
			orderBy: {
				updatedAt: 'desc'
			},
			skip: (page - 1) * limit,
			take: limit
		})

		const total = await this.prisma.chat.count({
			where: { members: { some: { id: userId } } }
		})

		const result = {
			data: chats,
			total,
			page,
			limit
		}

		// Короткий срок жизни кэша - 5 секунд
		await this.redisService.set(cacheKey, result, 5)
		return result
	}

	async createChat(userId: string, friendId: string) {
		const existingChat = await this.prisma.chat.findFirst({
			where: {
				AND: [
					{ members: { some: { id: userId } } },
					{ members: { some: { id: friendId } } }
				]
			},
			include: {
				members: {
					select: {
						id: true,
						name: true,
						surname: true,
						username: true,
						userAvatar: true
					}
				}
			}
		})

		if (existingChat) {
			return existingChat
		}

		const chat = await this.prisma.chat.create({
			data: {
				members: { connect: [{ id: userId }, { id: friendId }] },
			},
			include: {
				members: {
					select: {
						id: true,
						name: true,
						surname: true,
						username: true,
						userAvatar: true
					}
				}
			}
		})

		// Отправляем событие WebSocket обоим пользователям
		this.eventEmitter.emit('chat.created', { chat, userIds: [userId, friendId] })

		// Инвалидация кэша для обоих пользователей
		await this.redisService.deletePattern(`chats:${userId}:*`)
		await this.redisService.deletePattern(`chats:${friendId}:*`)
		
		return chat
	}

	async getChatMessages(chatId: string, page = 1, limit = 20) {
		// Короткое кэширование - 5 секунд
		const cacheKey = `chat:${chatId}:messages:page:${page}:limit:${limit}`
		const cachedMessages = await this.redisService.get<{data: Message[], total: number, page: number, limit: number}>(cacheKey)
		
		if (cachedMessages) {
			console.log(`Cache hit for ${cacheKey}, returning ${cachedMessages.data.length} messages`);
			return cachedMessages
		}

		console.log(`Cache miss for ${cacheKey}, fetching from database with skip: ${(page - 1) * limit}, take: ${limit}`);

		const messages = await this.prisma.message.findMany({
			where: { chatId },
			include: {
				user: {
					select: {
						id: true,
						name: true,
						surname: true,
						username: true,
						userAvatar: true
					}
				}
			},
			orderBy: {
				createdAt: 'asc'
			},
			skip: (page - 1) * limit,
			take: limit
		})

		const total = await this.prisma.message.count({ where: { chatId } })

		const result = {
			data: messages,
			total,
			page,
			limit
		}

		// Короткое кэширование - 5 секунд
		await this.redisService.set(cacheKey, result, 5)
		return result
	}

	async createMessage(chatId: string, userId: string, content: string) {
		console.log(`[ChatService] Creating message in chat ${chatId} by user ${userId}`);
		
		const message = await this.prisma.message.create({
			data: {
				content,
				chatId,
				userId
			},
			include: {
				user: {
					select: {
						id: true,
						name: true,
						surname: true,
						username: true,
						userAvatar: true
					}
				}
			}
		});
		
		console.log(`[ChatService] Created message ${message.id} in chat ${chatId}`);

		// Обновление времени последнего сообщения в чате
		await this.prisma.chat.update({
			where: { id: chatId },
			data: { updatedAt: new Date() }
		});

		// Получаем всех участников чата для отправки WebSocket событий
		const chat = await this.prisma.chat.findUnique({
			where: { id: chatId },
			include: { members: true }
		});
		
		if (chat?.members) {
			// Отправляем WebSocket событие всем участникам
			const memberIds = chat.members.map(member => member.id);
			
			// Эмитим событие о новом сообщении
			console.log(`[ChatService] Emitting message.created event for chat ${chatId}, message ${message.id}`);
			this.eventEmitter.emit('message.created', { 
				chatId, 
				message, 
				userIds: memberIds 
			});
			
			console.log(`[ChatService] Emitted message.created event for chat ${chatId} to users:`, memberIds);
			
			// Инвалидируем кэши
			await this.redisService.deletePattern(`chat:${chatId}:messages:*`);
			for (const member of chat.members) {
				await this.redisService.deletePattern(`chat:${chatId}:unread:${member.id}`);
				await this.redisService.deletePattern(`chats:${member.id}:*`);
			}
		} else {
			console.log(`[ChatService] No members found for chat ${chatId}`);
		}

		return message;
	}

	async markMessageAsRead(chatId: string, userId: string, messageId: number, page: number = 1) {
		try {
			// Update or create the LastReadMessage record
			const lastReadMessage = await this.prisma.lastReadMessage.upsert({
				where: {
					userId_chatId: {
						userId,
						chatId
					}
				},
				update: {
					messageId,
					lastReadMessagePage: page,
					readAt: new Date()
				},
				create: {
					userId,
					chatId,
					messageId,
					lastReadMessagePage: page,
					readAt: new Date()
				}
			});

			// Отправляем WebSocket событие о прочтении сообщения
			this.eventEmitter.emit('message.read', {
				chatId,
				userId,
				messageId
			})

			// Инвалидация кэша
			await this.redisService.deletePattern(`chat:${chatId}:unread:${userId}`);
			await this.redisService.deletePattern(`chat:${chatId}:lastread:${userId}`);
			
			return lastReadMessage;
		} catch (error) {
			console.error('Error marking message as read:', error);
			throw error;
		}
	}

	async getUnreadMessagesCount(chatId: string, userId: string) {
		const cacheKey = `chat:${chatId}:unread:${userId}`;
		const cachedCount = await this.redisService.get<number>(cacheKey);
		
		if (cachedCount !== null) {
			return cachedCount;
		}

		// Get the last read message ID for this user in this chat
		const lastRead = await this.prisma.lastReadMessage.findUnique({
			where: {
				userId_chatId: {
					userId,
					chatId
				}
			}
		});

		// If no messages have been read yet, count all messages
		if (!lastRead) {
			const totalCount = await this.prisma.message.count({
				where: { chatId }
			});
			
			// Короткое кэширование - 5 секунд
			await this.redisService.set(cacheKey, totalCount, 5);
			return totalCount;
		}

		// Count messages newer than the last read message
		const unreadCount = await this.prisma.message.count({
			where: {
				chatId,
				id: {
					gt: lastRead.messageId
				}
			}
		});
		
		// Короткое кэширование - 5 секунд
		await this.redisService.set(cacheKey, unreadCount, 5);
		return unreadCount;
	}

	async getLastReadMessageInfo(chatId: string, userId: string) {
		const cacheKey = `chat:${chatId}:lastread:${userId}`;
		const cachedInfo = await this.redisService.get<{id: number, page: number}>(cacheKey);
		
		if (cachedInfo) {
			return cachedInfo;
		}
		
		const lastRead = await this.prisma.lastReadMessage.findUnique({
			where: {
				userId_chatId: {
					userId,
					chatId
				}
			},
			select: {
				messageId: true,
				lastReadMessagePage: true
			}
		});
		
		const result = lastRead 
			? { id: lastRead.messageId, page: lastRead.lastReadMessagePage } 
			: { id: null, page: 1 };
			
		// Короткое кэширование - 10 секунд
		await this.redisService.set(cacheKey, result, 10);
		return result;
	}

	async getChatById(chatId: string) {
		try {
			return await this.prisma.chat.findUnique({
				where: { id: chatId },
				include: {
					members: {
						select: {
							id: true,
							name: true,
							surname: true,
							username: true,
							userAvatar: true
						}
					},
					messages: {
						orderBy: {
							createdAt: 'desc'
						},
						take: 1
					}
				}
			});
		} catch (error) {
			console.error(`Error getting chat by ID ${chatId}:`, error);
			throw error;
		}
	}

	/**
	 * Check if a user is a member of a chat
	 */
	async isUserMemberOfChat(chatId: string, userId: string): Promise<boolean> {
		try {
			const chat = await this.prisma.chat.findUnique({
				where: { id: chatId },
				include: {
					members: {
						where: { id: userId },
						select: { id: true }
					}
				}
			});
			
			return !!chat && chat.members.length > 0;
		} catch (error) {
			console.error(`Error checking if user ${userId} is member of chat ${chatId}:`, error);
			return false;
		}
	}
}
