import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedSocket } from '../config/types/auth.interface';
export declare class FriendshipGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    server: Server;
    constructor(prisma: PrismaService);
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handleFriendRequest(client: AuthenticatedSocket, data: {
        receiverId: string;
    }): Promise<{
        success: boolean;
        error: string;
        request?: undefined;
    } | {
        success: boolean;
        request: {
            sender: {
                name: string;
                surname: string;
                username: string;
                email: string;
                password: string;
                userAvatar: string;
                userCover: string;
                id: string;
                bio: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
                created_at: Date;
                updated_at: Date;
            };
        } & {
            id: string;
            senderId: string;
            receiverId: string;
            status: import("@/prisma/__generated__").$Enums.FriendshipRequestStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        error?: undefined;
    }>;
    acceptFriendRequest(client: AuthenticatedSocket, data: {
        requestId: string;
    }): Promise<{
        success: boolean;
        friendship: {
            friend: {
                name: string;
                surname: string;
                username: string;
                email: string;
                password: string;
                userAvatar: string;
                userCover: string;
                id: string;
                bio: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
                created_at: Date;
                updated_at: Date;
            };
        } & {
            id: string;
            userId: string;
            createdAt: Date;
            friendId: string;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        friendship?: undefined;
    }>;
    declineFriendRequest(client: AuthenticatedSocket, data: {
        requestId: string;
    }): Promise<{
        success: boolean;
        request: {
            id: string;
            senderId: string;
            receiverId: string;
            status: import("@/prisma/__generated__").$Enums.FriendshipRequestStatus;
            createdAt: Date;
            updatedAt: Date;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        request?: undefined;
    }>;
}
