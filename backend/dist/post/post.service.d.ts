import { PostModel } from '@prisma/client';
import { CreatePostDto, DeletePostDto, EditPostDto, LikePostDto, UpsertDraftDto } from '../dtos/post.dto';
import { PrismaService } from '../prisma/prisma.service';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import("@/prisma/__generated__").Prisma.PrismaPromise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }[]>;
    findAllSortedByLikes(page?: number, limit?: number): Promise<{
        data: PostModel[];
        total: number;
    }>;
    findAllByUsername(page: number, limit: number, username: string): Promise<{
        data: {
            likes: number;
            User: {
                name: string;
                surname: string;
                username: string;
                email: string;
                userAvatar: string;
                userCover: string;
                id: string;
                bio: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
                created_at: Date;
                updated_at: Date;
                likedPosts: {
                    userId: string;
                    postId: number;
                }[];
            };
            Like: {
                userId: string;
                postId: number;
            }[];
            Comment: {
                id: number;
                created_at: Date;
                updated_at: Date;
                userId: string;
                postId: number;
                content: string;
                parentId: number | null;
            }[];
            id: number;
            created_at: Date;
            updated_at: Date;
            userId: string;
            content: string;
        }[];
        total: number;
    }>;
    findAllSortedByDate(page?: number, limit?: number): Promise<{
        data: {
            likes: number;
            User: {
                name: string;
                surname: string;
                username: string;
                email: string;
                userAvatar: string;
                userCover: string;
                id: string;
                bio: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
                created_at: Date;
                updated_at: Date;
                likedPosts: {
                    userId: string;
                    postId: number;
                }[];
            };
            Like: {
                userId: string;
                postId: number;
            }[];
            Comment: {
                id: number;
                created_at: Date;
                updated_at: Date;
                userId: string;
                postId: number;
                content: string;
                parentId: number | null;
            }[];
            id: number;
            created_at: Date;
            updated_at: Date;
            userId: string;
            content: string;
        }[];
        total: number;
    }>;
    createPost(data: CreatePostDto): import("@/prisma/__generated__").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }, never, import("@/prisma/__generated__/runtime/library").DefaultArgs>;
    likePost(data: LikePostDto): Promise<{
        likes: number;
        Like: {
            userId: string;
            postId: number;
        }[];
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }>;
    unLikePost(data: LikePostDto): Promise<{
        likes: number;
        Like: {
            userId: string;
            postId: number;
        }[];
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }>;
    findById(id: number): Promise<{
        likes: number;
        User: {
            name: string;
            surname: string;
            username: string;
            email: string;
            userAvatar: string;
            userCover: string;
            id: string;
            bio: string;
            role: import("@/prisma/__generated__").$Enums.RoleType;
            created_at: Date;
            updated_at: Date;
            likedPosts: {
                userId: string;
                postId: number;
            }[];
        };
        Like: {
            userId: string;
            postId: number;
        }[];
        Comment: ({
            user: {
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
            id: number;
            created_at: Date;
            updated_at: Date;
            userId: string;
            postId: number;
            content: string;
            parentId: number | null;
        })[];
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }>;
    delete(data: DeletePostDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }>;
    edit(data: EditPostDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }>;
    upsertDraft(userId: string, data: UpsertDraftDto): Promise<{
        id: number;
        userId: string;
        content: string;
    }>;
    deleteMediaDraft(userId: string, key: string): Promise<{
        id: number;
        userId: string;
        content: string;
    }>;
    getDraft(userId: string): Promise<{
        media: {
            id: number;
            key: string;
            url: string;
        }[];
    } & {
        id: number;
        userId: string;
        content: string;
    }>;
}
