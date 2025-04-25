import { ChatService } from './chat.service';
export declare class ChatController {
    private readonly chatService;
    constructor(chatService: ChatService);
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
        data: import("@/prisma/__generated__").Message[];
        total: number;
        page: number;
        limit: number;
    }>;
    getUnreadMessagesCount(chatId: string, userId: string): Promise<{
        count: number;
    }>;
    getLastReadMessageInfo(chatId: string, userId: string): Promise<{
        id: number;
        page: number;
    }>;
    markMessageAsRead(chatId: string, userId: string, messageId: number, page?: number): Promise<{
        id: string;
        chatId: string;
        userId: string;
        messageId: number;
        lastReadMessagePage: number;
        readAt: Date;
    }>;
}
