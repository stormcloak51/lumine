import { PrismaService } from '../prisma/prisma.service';
export declare class FriendshipService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getFriendRequests(userId: string): Promise<({
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
    })[]>;
    getFriendships(userId: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        friendId: string;
    }[]>;
    getFriends(userId: string): Promise<{
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
    }[]>;
}
