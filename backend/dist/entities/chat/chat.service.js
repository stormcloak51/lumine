"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatService = void 0;
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
const redis_service_1 = require("../../infrastructure/redis/redis.service");
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
let ChatService = class ChatService {
    constructor(redisService, prisma, eventEmitter) {
        this.redisService = redisService;
        this.prisma = prisma;
        this.eventEmitter = eventEmitter;
    }
    async getChats(userId, page = 1, limit = 30) {
        const cacheKey = `chats:${userId}:page:${page}:limit:${limit}`;
        const cachedChats = await this.redisService.get(cacheKey);
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
        });
        const total = await this.prisma.chat.count({
            where: { members: { some: { id: userId } } }
        });
        const result = {
            data: chats,
            total,
            page,
            limit
        };
        await this.redisService.set(cacheKey, result, 5);
        return result;
    }
    async createChat(userId, friendId) {
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
        });
        if (existingChat) {
            return existingChat;
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
        });
        this.eventEmitter.emit('chat.created', { chat, userIds: [userId, friendId] });
        await this.redisService.deletePattern(`chats:${userId}:*`);
        await this.redisService.deletePattern(`chats:${friendId}:*`);
        return chat;
    }
    async getChatMessages(chatId, page = 1, limit = 20) {
        const cacheKey = `chat:${chatId}:messages:page:${page}:limit:${limit}`;
        const cachedMessages = await this.redisService.get(cacheKey);
        if (cachedMessages) {
            console.log(`Cache hit for ${cacheKey}, returning ${cachedMessages.data.length} messages`);
            return cachedMessages;
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
        });
        const total = await this.prisma.message.count({ where: { chatId } });
        const result = {
            data: messages,
            total,
            page,
            limit
        };
        await this.redisService.set(cacheKey, result, 5);
        return result;
    }
    async createMessage(chatId, userId, content) {
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
        await this.prisma.chat.update({
            where: { id: chatId },
            data: { updatedAt: new Date() }
        });
        const chat = await this.prisma.chat.findUnique({
            where: { id: chatId },
            include: { members: true }
        });
        if (chat?.members) {
            const memberIds = chat.members.map(member => member.id);
            console.log(`[ChatService] Emitting message.created event for chat ${chatId}, message ${message.id}`);
            this.eventEmitter.emit('message.created', {
                chatId,
                message,
                userIds: memberIds
            });
            console.log(`[ChatService] Emitted message.created event for chat ${chatId} to users:`, memberIds);
            await this.redisService.deletePattern(`chat:${chatId}:messages:*`);
            for (const member of chat.members) {
                await this.redisService.deletePattern(`chat:${chatId}:unread:${member.id}`);
                await this.redisService.deletePattern(`chats:${member.id}:*`);
            }
        }
        else {
            console.log(`[ChatService] No members found for chat ${chatId}`);
        }
        return message;
    }
    async markMessageAsRead(chatId, userId, messageId, page = 1) {
        try {
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
            this.eventEmitter.emit('message.read', {
                chatId,
                userId,
                messageId
            });
            await this.redisService.deletePattern(`chat:${chatId}:unread:${userId}`);
            await this.redisService.deletePattern(`chat:${chatId}:lastread:${userId}`);
            return lastReadMessage;
        }
        catch (error) {
            console.error('Error marking message as read:', error);
            throw error;
        }
    }
    async getUnreadMessagesCount(chatId, userId) {
        const cacheKey = `chat:${chatId}:unread:${userId}`;
        const cachedCount = await this.redisService.get(cacheKey);
        if (cachedCount !== null) {
            return cachedCount;
        }
        const lastRead = await this.prisma.lastReadMessage.findUnique({
            where: {
                userId_chatId: {
                    userId,
                    chatId
                }
            }
        });
        if (!lastRead) {
            const totalCount = await this.prisma.message.count({
                where: { chatId }
            });
            await this.redisService.set(cacheKey, totalCount, 5);
            return totalCount;
        }
        const unreadCount = await this.prisma.message.count({
            where: {
                chatId,
                id: {
                    gt: lastRead.messageId
                }
            }
        });
        await this.redisService.set(cacheKey, unreadCount, 5);
        return unreadCount;
    }
    async getLastReadMessageInfo(chatId, userId) {
        const cacheKey = `chat:${chatId}:lastread:${userId}`;
        const cachedInfo = await this.redisService.get(cacheKey);
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
        await this.redisService.set(cacheKey, result, 10);
        return result;
    }
    async getChatById(chatId) {
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
        }
        catch (error) {
            console.error(`Error getting chat by ID ${chatId}:`, error);
            throw error;
        }
    }
    async isUserMemberOfChat(chatId, userId) {
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
        }
        catch (error) {
            console.error(`Error checking if user ${userId} is member of chat ${chatId}:`, error);
            return false;
        }
    }
};
exports.ChatService = ChatService;
exports.ChatService = ChatService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [redis_service_1.RedisService,
        prisma_service_1.PrismaService,
        event_emitter_1.EventEmitter2])
], ChatService);
//# sourceMappingURL=chat.service.js.map