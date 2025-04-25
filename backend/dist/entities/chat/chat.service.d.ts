import { Message } from '@/prisma/__generated__/edge';
import { PrismaService } from '@/src/infrastructure/prisma/prisma.service';
import { RedisService } from '@/src/infrastructure/redis/redis.service';
import { EventEmitter2 } from '@nestjs/event-emitter';
export declare class ChatService {
    private readonly redisService;
    private readonly prisma;
    private readonly eventEmitter;
    constructor(redisService: RedisService, prisma: PrismaService, eventEmitter: EventEmitter2);
    getChats(userId: string, page?: number, limit?: number): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }[] | {
        data: ({
            messages: {
                id: number;
                createdAt: Date;
                updatedAt: Date;
                content: string;
                chatId: string;
                userId: string;
            }[];
            members: {
                name: string;
                id: string;
                username: string;
                surname: string;
                userAvatar: string;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
        })[];
        total: number;
        page: number;
        limit: number;
    }>;
    createChat(userId: string, friendId: string): Promise<{
        members: {
            name: string;
            id: string;
            username: string;
            surname: string;
            userAvatar: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getChatMessages(chatId: string, page?: number, limit?: number): Promise<{
        data: Message[];
        total: number;
        page: number;
        limit: number;
    }>;
    createMessage(chatId: string, userId: string, content: string): Promise<{
        user: {
            name: string;
            id: string;
            username: string;
            surname: string;
            userAvatar: string;
        };
    } & {
        id: number;
        createdAt: Date;
        updatedAt: Date;
        content: string;
        chatId: string;
        userId: string;
    }>;
    markMessageAsRead(chatId: string, userId: string, messageId: number, page?: number): Promise<{
        id: string;
        chatId: string;
        userId: string;
        messageId: number;
        lastReadMessagePage: number;
        readAt: Date;
    }>;
    getUnreadMessagesCount(chatId: string, userId: string): Promise<number>;
    getLastReadMessageInfo(chatId: string, userId: string): Promise<{
        id: number;
        page: number;
    }>;
    getChatById(chatId: string): Promise<{
        messages: {
            id: number;
            createdAt: Date;
            updatedAt: Date;
            content: string;
            chatId: string;
            userId: string;
        }[];
        members: {
            name: string;
            id: string;
            username: string;
            surname: string;
            userAvatar: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
    }>;
    isUserMemberOfChat(chatId: string, userId: string): Promise<boolean>;
}
