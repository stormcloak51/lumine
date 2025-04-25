import { User } from 'prisma/__generated__';
import { CreatePostDto, EditPostDto, UpsertDraftDto } from 'src/infrastructure/dtos/post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): import("prisma/__generated__").Prisma.PrismaPromise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }[]>;
    findAllSortedByLikes(page?: number, limit?: number): Promise<{
        data: import("prisma/__generated__").PostModel[];
        total: number;
    }>;
    findAllSortedByDate(page?: number, limit?: number): Promise<{
        data: {
            likes: number;
            User: {
                username: string;
                email: string;
                userAvatar: string;
                userCover: string;
                name: string;
                surname: string;
                id: string;
                bio: string;
                role: import("prisma/__generated__").$Enums.RoleType;
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
    createPost(data: CreatePostDto, user: User): import("prisma/__generated__").Prisma.Prisma__PostModelClient<{
        User: {
            username: string;
            email: string;
            userAvatar: string;
            userCover: string;
            name: string;
            surname: string;
            id: string;
            bio: string;
            role: import("prisma/__generated__").$Enums.RoleType;
            created_at: Date;
            updated_at: Date;
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
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }, never, import("@/prisma/__generated__/runtime/library").DefaultArgs, import("prisma/__generated__").Prisma.PrismaClientOptions>;
    findById(id: number): Promise<{
        likes: number;
        User: {
            username: string;
            email: string;
            userAvatar: string;
            userCover: string;
            name: string;
            surname: string;
            id: string;
            bio: string;
            role: import("prisma/__generated__").$Enums.RoleType;
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
    findByUsername(page: number, limit: number, username: string): Promise<{
        data: {
            likes: number;
            User: {
                username: string;
                email: string;
                userAvatar: string;
                userCover: string;
                name: string;
                surname: string;
                id: string;
                bio: string;
                role: import("prisma/__generated__").$Enums.RoleType;
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
    likePost(postId: number, userId: string): Promise<{
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
    delete(postId: number, userId: string): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }>;
    edit(data: EditPostDto, userId: string): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        content: string;
    }>;
    getDraft(user: User): Promise<{
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
    upsertDraft(data: UpsertDraftDto, user: User): Promise<{
        id: number;
        userId: string;
        content: string;
    }>;
    deleteMediaDraft(key: string, user: User): Promise<{
        id: number;
        userId: string;
        content: string;
    }>;
}
