import { OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { AuthenticatedSocket } from 'src/infrastructure/config/types/auth.interface';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
export declare class FriendshipGateway implements OnGatewayConnection, OnGatewayDisconnect {
    private prisma;
    server: Server;
    private sentNotifications;
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
                username: string;
                email: string;
                userAvatar: string;
                password: string;
                userCover: string;
                name: string;
                surname: string;
                id: string;
                bio: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
                created_at: Date;
                updated_at: Date;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            senderId: string;
            receiverId: string;
            status: import("@/prisma/__generated__").$Enums.FriendshipRequestStatus;
        };
        error?: undefined;
    }>;
    acceptFriendRequest(client: AuthenticatedSocket, data: {
        requestId: string;
    }): Promise<{
        success: boolean;
        friendship: {
            friend: {
                username: string;
                email: string;
                userAvatar: string;
                password: string;
                userCover: string;
                name: string;
                surname: string;
                id: string;
                bio: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
                created_at: Date;
                updated_at: Date;
            };
        } & {
            id: string;
            userId: string;
            friendId: string;
            createdAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
            senderId: string;
            receiverId: string;
            status: import("@/prisma/__generated__").$Enums.FriendshipRequestStatus;
        }[];
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        request?: undefined;
    }>;
}
