import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
export declare class FriendshipService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFriendRequests(userId: string): Promise<({
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
    })[]>;
    getFriendships(userId: string): Promise<{
        id: string;
        userId: string;
        friendId: string;
        createdAt: Date;
    }[]>;
    getFriends(userId: string): Promise<{
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
    }[]>;
    getFriendsByUsername(username: string): Promise<{
        id: string;
        createdAt: Date;
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
        user: {
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
        userId: string;
        friendId: string;
    }[]>;
    deleteFriend(userId: string, friendId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
