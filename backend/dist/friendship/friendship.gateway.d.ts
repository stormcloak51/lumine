import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedSocket } from '../config/types/auth.interface';
export declare class FriendshipGateway {
    private prisma;
    server: Server;
    constructor(prisma: PrismaService);
    handleFriendRequest(client: AuthenticatedSocket, { receiverId }: {
        receiverId: string;
    }): Promise<{
        success: boolean;
        request: {
            sender: {
                id: string;
                name: string;
                username: string;
                email: string;
                password: string;
                surname: string;
                bio: string;
                userAvatar: string;
                userCover: string;
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
    } | {
        success: boolean;
        error: string;
        request?: undefined;
    }>;
    handleFriendResponse(socket: Socket, { requestId, accept }: {
        requestId: string;
        accept: boolean;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
    }>;
    handleRemoveFriend(socket: Socket, { friendId }: {
        friendId: string;
    }): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
    }>;
}
