import { FriendshipService } from './friendship.service';
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    getFriendRequests(id: string): Promise<({
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
    getFriendships(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        friendId: string;
    }[]>;
    getFriends(id: string): Promise<{
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
