import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { ChatService } from './chat.service';
export declare class ChatGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private readonly chatService;
    server: Server;
    private readonly logger;
    private userSockets;
    constructor(chatService: ChatService);
    handleConnection(client: Socket): Promise<void>;
    handleDisconnect(client: Socket): void;
    handleJoinChat(client: Socket, data: {
        chatId: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    handleLeaveChat(client: Socket, data: {
        chatId: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    handleSendMessage(client: Socket, data: {
        chatId: string;
        content: string;
    }): Promise<{
        success: boolean;
        message: {
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
        };
        error?: undefined;
    } | {
        success: boolean;
        error: any;
        message?: undefined;
    }>;
    handleMarkMessageRead(client: Socket, data: {
        chatId: string;
        messageId: number;
        page: number;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    }>;
    handleChatCreated(payload: {
        chat: any;
        userIds: string[];
    }): void;
    handleMessageCreated(payload: {
        chatId: string;
        message: any;
        userIds: string[];
    }): Promise<void>;
    handleMessageRead(payload: {
        chatId: string;
        userId: string;
        messageId: number;
    }): void;
    handleJoinUserRoom(client: Socket, data: {
        userId: string;
    }): {
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: any;
    };
}
