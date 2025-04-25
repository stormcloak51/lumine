import { UpdateUserDto } from '@/src/infrastructure/dtos/user.dto';
import { Prisma } from 'prisma/__generated__';
import { RegisterDto } from 'src/entities/auth/dto/register.dto';
import { PrismaService } from 'src/infrastructure/prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: RegisterDto): Promise<{
        username: string;
        email: string;
        userAvatar: string;
        password: string;
        userCover: string;
        name: string;
        surname: string;
        id: string;
        bio: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
    findOne(idOrEmailOrUsername: string, include?: Prisma.UserInclude): Prisma.Prisma__UserClient<{
        postDraft: {
            id: number;
            userId: string;
            content: string;
        };
        posts: {
            id: number;
            created_at: Date;
            updated_at: Date;
            userId: string;
            content: string;
        }[];
        likedPosts: {
            userId: string;
            postId: number;
        }[];
        comments: {
            id: number;
            created_at: Date;
            updated_at: Date;
            userId: string;
            postId: number;
            content: string;
            parentId: number | null;
        }[];
        likedComments: {
            created_at: Date;
            userId: string;
            commentId: number;
        }[];
        chats: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
        }[];
        messages: {
            id: number;
            userId: string;
            content: string;
            createdAt: Date;
            updatedAt: Date;
            chatId: string;
        }[];
        lastReadMessages: {
            id: string;
            userId: string;
            chatId: string;
            messageId: number;
            lastReadMessagePage: number;
            readAt: Date;
        }[];
        sentRequests: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            senderId: string;
            receiverId: string;
            status: import("prisma/__generated__").$Enums.FriendshipRequestStatus;
        }[];
        receivedRequests: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            senderId: string;
            receiverId: string;
            status: import("prisma/__generated__").$Enums.FriendshipRequestStatus;
        }[];
        friends: {
            id: string;
            userId: string;
            friendId: string;
            createdAt: Date;
        }[];
        friendsOf: {
            id: string;
            userId: string;
            friendId: string;
            createdAt: Date;
        }[];
        _count: {
            posts: number;
            likedPosts: number;
            comments: number;
            likedComments: number;
            postDraft: number;
            chats: number;
            messages: number;
            lastReadMessages: number;
            sentRequests: number;
            receivedRequests: number;
            friends: number;
            friendsOf: number;
        };
    } & {
        username: string;
        email: string;
        userAvatar: string;
        password: string;
        userCover: string;
        name: string;
        surname: string;
        id: string;
        bio: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }, null, import("@/prisma/__generated__/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    checkUserExists(dto: RegisterDto): Promise<{
        username: string;
        email: string;
        userAvatar: string;
        password: string;
        userCover: string;
        name: string;
        surname: string;
        id: string;
        bio: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(): Prisma.PrismaPromise<{
        username: string;
        email: string;
        userAvatar: string;
        password: string;
        userCover: string;
        name: string;
        surname: string;
        id: string;
        bio: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }[]>;
    update({ id, dto }: {
        id: string;
        dto: UpdateUserDto;
    }): Promise<{
        username: string;
        email: string;
        userAvatar: string;
        password: string;
        userCover: string;
        name: string;
        surname: string;
        id: string;
        bio: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(id: string): Prisma.Prisma__UserClient<{
        username: string;
        email: string;
        userAvatar: string;
        password: string;
        userCover: string;
        name: string;
        surname: string;
        id: string;
        bio: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }, never, import("@/prisma/__generated__/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
