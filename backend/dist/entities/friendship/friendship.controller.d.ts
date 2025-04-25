import { FriendshipService } from './friendship.service';
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    getFriendRequests(id: string): Promise<({
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
    getFriendships(id: string): Promise<{
        id: string;
        userId: string;
        friendId: string;
        createdAt: Date;
    }[]>;
    getFriends(id: string): Promise<{
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
    deleteFriend(id: string, friendId: string): Promise<{
        success: boolean;
        message: string;
    }>;
}
