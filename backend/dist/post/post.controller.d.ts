import { PostModel, User } from '@prisma/client';
import { UpsertDraftDto, CreatePostDto, DeletePostDto, EditPostDto, LikePostDto } from '../dtos/post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): import("@/prisma/__generated__").Prisma.PrismaPromise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }[]>;
    findAllSortedByLikes(page?: number, limit?: number): Promise<{
        data: PostModel[];
        total: number;
    }>;
    findAllSortedByDate(page?: number, limit?: number): Promise<{
        data: {
            likes: number;
            User: {
                id: string;
                created_at: Date;
                updated_at: Date;
                name: string;
                username: string;
                email: string;
                surname: string;
                bio: string;
                userAvatar: string;
                userCover: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
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
                content: string;
                userId: string;
                postId: number;
                parentId: number | null;
            }[];
            id: number;
            created_at: Date;
            updated_at: Date;
            content: string;
            userId: string;
        }[];
        total: number;
    }>;
    createPost(data: CreatePostDto): import("@/prisma/__generated__").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }, never, import("@/prisma/__generated__/runtime/library").DefaultArgs>;
    findById(id: number): Promise<{
        likes: number;
        User: {
            id: string;
            created_at: Date;
            updated_at: Date;
            name: string;
            username: string;
            email: string;
            surname: string;
            bio: string;
            userAvatar: string;
            userCover: string;
            role: import("@/prisma/__generated__").$Enums.RoleType;
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
                id: string;
                created_at: Date;
                updated_at: Date;
                name: string;
                username: string;
                email: string;
                password: string;
                surname: string;
                bio: string;
                userAvatar: string;
                userCover: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
            };
        } & {
            id: number;
            created_at: Date;
            updated_at: Date;
            content: string;
            userId: string;
            postId: number;
            parentId: number | null;
        })[];
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }>;
    findByUsername(page: number, limit: number, username: string): Promise<{
        data: {
            likes: number;
            User: {
                id: string;
                created_at: Date;
                updated_at: Date;
                name: string;
                username: string;
                email: string;
                surname: string;
                bio: string;
                userAvatar: string;
                userCover: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
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
                content: string;
                userId: string;
                postId: number;
                parentId: number | null;
            }[];
            id: number;
            created_at: Date;
            updated_at: Date;
            content: string;
            userId: string;
        }[];
        total: number;
    }>;
    likePost(data: LikePostDto): Promise<{
        likes: number;
        Like: {
            userId: string;
            postId: number;
        }[];
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }>;
    unlikePost(data: LikePostDto): Promise<{
        likes: number;
        Like: {
            userId: string;
            postId: number;
        }[];
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }>;
    delete(data: DeletePostDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }>;
    edit(data: EditPostDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }>;
    getDraft(user: User): Promise<{
        media: {
            id: number;
            key: string;
            url: string;
        }[];
    } & {
        id: number;
        content: string;
        userId: string;
    }>;
    upsertDraft(data: UpsertDraftDto, user: User): Promise<{
        id: number;
        content: string;
        userId: string;
    }>;
    deleteMediaDraft(key: string, user: User): Promise<{
        id: number;
        content: string;
        userId: string;
    }>;
}
