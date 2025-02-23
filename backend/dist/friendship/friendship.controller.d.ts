import { FriendshipService } from './friendship.service';
export declare class FriendshipController {
    private readonly friendshipService;
    constructor(friendshipService: FriendshipService);
    getFriendRequests(id: string): Promise<({
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
    })[]>;
    getFriendships(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        friendId: string;
    }[]>;
    getFriends(id: string): Promise<{
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
    }[]>;
}
