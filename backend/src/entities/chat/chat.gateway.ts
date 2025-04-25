import { Logger } from '@nestjs/common'
import { OnEvent } from '@nestjs/event-emitter'
import {
	ConnectedSocket,
	MessageBody,
	OnGatewayConnection,
	OnGatewayDisconnect,
	SubscribeMessage,
	WebSocketGateway,
	WebSocketServer
} from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { ChatService } from './chat.service'

@WebSocketGateway({
	namespace: 'chat',
	cors: {
		origin: '*',
	},
})
export class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
	@WebSocketServer()
	server: Server;

	private readonly logger = new Logger(ChatGateway.name);
	private userSockets: Map<string, string[]> = new Map(); // userId -> socketIds[]

	constructor(
		private readonly chatService: ChatService,
	) {}

	async handleConnection(client: Socket) {
		try {
			const userId = client.handshake.query.userId as string
			if (!userId) {
				this.logger.error('Client disconnected: No userId provided')
				client.disconnect()
				return
			}

			// Store user ID in socket data for easy access
			client.data = { userId }

			// Add socket ID to user's socket mapping
			if (!this.userSockets.has(userId)) {
				this.userSockets.set(userId, [])
			}
			this.userSockets.get(userId)!.push(client.id)

			// Join user to their own room automatically using their ID
			client.join(userId)
			this.logger.log(`Client ${client.id} joined their user room: ${userId}`)

			this.logger.log(`Client connected: ${client.id}, User: ${userId}`)
		} catch (error) {
			this.logger.error(`Error handling connection: ${error.message}`)
			client.disconnect()
		}
	}

	handleDisconnect(client: Socket) {
		const userId = client.data.userId;
		if (userId) {
			// Удаляем socketId из списка пользователя
			const sockets = this.userSockets.get(userId) || [];
			const index = sockets.indexOf(client.id);
			if (index !== -1) {
				sockets.splice(index, 1);
				if (sockets.length === 0) {
					this.userSockets.delete(userId);
				} else {
					this.userSockets.set(userId, sockets);
				}
			}
		}
		this.logger.log(`Client disconnected: ${client.id}`);
	}

	// Обработка событий от клиентов
	@SubscribeMessage('joinChat')
	async handleJoinChat(@ConnectedSocket() client: Socket, @MessageBody() data: { chatId: string }) {
		try {
			const userId = client.data.userId;
			if (!userId) return { success: false, error: 'Unauthorized' };

			// Verify that the user is a member of this chat
			const isMember = await this.chatService.isUserMemberOfChat(data.chatId, userId);
			if (!isMember) {
				this.logger.warn(`User ${userId} attempted to join chat ${data.chatId} but is not a member`);
				return { success: false, error: 'Not a member of this chat' };
			}

			// Join the client to the chat room
			client.join(data.chatId);
			this.logger.log(`Client ${client.id} (User ${userId}) joined chat room: ${data.chatId}`);
			
			return { success: true };
		} catch (error) {
			this.logger.error(`Error joining chat: ${error.message}`);
			return { success: false, error: error.message };
		}
	}

	@SubscribeMessage('leaveChat')
	async handleLeaveChat(@ConnectedSocket() client: Socket, @MessageBody() data: { chatId: string }) {
		try {
			client.leave(data.chatId);
			this.logger.log(`Client ${client.id} left chat ${data.chatId}`);
			return { success: true };
		} catch (error) {
			this.logger.error(`Error leaving chat: ${error.message}`);
			return { success: false, error: error.message };
		}
	}

	@SubscribeMessage('sendMessage')
	async handleSendMessage(@ConnectedSocket() client: Socket, @MessageBody() data: { chatId: string, content: string }) {
		try {
			const userId = client.data.userId;
			if (!userId) return { success: false, error: 'Unauthorized' };

			this.logger.log(`User ${userId} sent message to chat ${data.chatId}: "${data.content.substring(0, 20)}${data.content.length > 20 ? '...' : ''}"`);

			// Создаем сообщение через сервис
			const message = await this.chatService.createMessage(
				data.chatId,
				userId,
				data.content
			);

			// Получаем всех пользователей в комнате чата
			const chat = await this.chatService.getChatById(data.chatId);
			
			if (chat && chat.members) {
				this.logger.log(`Broadcasting message ${message.id} to ${chat.members.length} members of chat ${data.chatId}`);
				
				// Broadcast to the chat room itself (all sockets currently in the room)
				this.server.to(data.chatId).emit('newMessage', {
					chatId: data.chatId,
					message: message
				});
				
				// Also send directly to each user's personal room to ensure delivery
				// This is crucial for users who might not be in the chat room at the moment
				for (const member of chat.members) {
					this.logger.log(`Sending message ${message.id} directly to user ${member.id}`);
					
					// Отправляем newMessage напрямую в комнату пользователя
					this.server.to(member.id).emit('newMessage', {
						chatId: data.chatId,
						message: message
					});
					
					// Отправляем chatUpdated для обновления списка чатов
					this.server.to(member.id).emit('chatUpdated', {
						chatId: data.chatId,
						lastMessage: message
					});
				}
			}

			return { success: true, message };
		} catch (error) {
			this.logger.error(`Error sending message: ${error.message}`);
			return { success: false, error: error.message };
		}
	}

	@SubscribeMessage('markMessageRead')
	async handleMarkMessageRead(@ConnectedSocket() client: Socket, @MessageBody() data: { chatId: string, messageId: number, page: number }) {
		try {
			const userId = client.data.userId;
			if (!userId) return { success: false, error: 'Unauthorized' };

			// Отмечаем сообщение как прочитанное
			await this.chatService.markMessageAsRead(
				data.chatId,
				userId,
				data.messageId,
				data.page
			);

			return { success: true };
		} catch (error) {
			this.logger.error(`Error marking message as read: ${error.message}`);
			return { success: false, error: error.message };
		}
	}

	// Слушатели событий от сервиса
	@OnEvent('chat.created')
	handleChatCreated(payload: { chat: any, userIds: string[] }) {
		// Отправляем событие всем участникам чата
		for (const userId of payload.userIds) {
			this.server.to(userId).emit('newChat', { chat: payload.chat });
		}
		this.logger.log(`Emitted newChat event to users: ${payload.userIds.join(', ')}`);
	}

	@OnEvent('message.created')
	async handleMessageCreated(payload: { chatId: string, message: any, userIds: string[] }) {
		try {
			// Получаем список всех клиентов в комнате чата
			const socketsInRoom = this.server.in(payload.chatId).allSockets();
			
			this.logger.log(`Room ${payload.chatId} has ${socketsInRoom ? (await socketsInRoom).size : 0} connected clients`);
			
			// Отправляем сообщение в комнату чата
			this.logger.log(`Emitting newMessage to chat room: ${payload.chatId}, message ID: ${payload.message.id}`);
			this.server.to(payload.chatId).emit('newMessage', {
				chatId: payload.chatId,
				message: payload.message
			});

			// Также отправляем уведомление о новом сообщении всем участникам напрямую
			for (const userId of payload.userIds) {
				this.logger.log(`Emitting chatUpdated to user: ${userId}`);
				this.server.to(userId).emit('chatUpdated', {
					chatId: payload.chatId,
					lastMessage: payload.message
				});
				
				// Также отправляем копию newMessage напрямую пользователям
				this.server.to(userId).emit('newMessage', {
					chatId: payload.chatId,
					message: payload.message
				});
			}
			
			this.logger.log(`Successfully emitted newMessage event to chat: ${payload.chatId}`);
		} catch (error) {
			this.logger.error(`Error emitting message events: ${error.message}`);
		}
	}

	@OnEvent('message.read')
	handleMessageRead(payload: { chatId: string, userId: string, messageId: number }) {
		// Отправляем событие в комнату чата
		this.server.to(payload.chatId).emit('messageRead', payload);
		this.logger.log(`Emitted messageRead event to chat: ${payload.chatId}`);
	}

	@SubscribeMessage('joinUserRoom')
	handleJoinUserRoom(@ConnectedSocket() client: Socket, @MessageBody() data: { userId: string }) {
		try {
			// Verify that the user is joining their own room
			const socketUserId = client.data.userId
			if (socketUserId !== data.userId) {
				this.logger.error(`User ${socketUserId} attempted to join another user's room: ${data.userId}`)
				return { success: false, error: 'Unauthorized' }
			}

			client.join(data.userId)
			this.logger.log(`Client ${client.id} joined user room: ${data.userId}`)
			return { success: true }
		} catch (error) {
			this.logger.error(`Error joining user room: ${error.message}`)
			return { success: false, error: error.message }
		}
	}
}
