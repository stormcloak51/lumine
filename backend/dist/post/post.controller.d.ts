import { PostModel, User } from '@prisma/client';
import { UpsertDraftDto, CreatePostDto, DeletePostDto, EditPostDto, LikePostDto } from '../dtos/post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        content: string;
        userId: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findAllSortedByLikes(page?: number, limit?: number): Promise<{
        data: PostModel[];
        total: number;
    }>;
    findAllSortedByDate(page?: number, limit?: number): Promise<{
        data: {
            likes: number;
            User: {
                username: string;
                email: string;
                userAvatar: string;
                name: string;
                surname: string;
                id: string;
                userCover: string;
                bio: string;
                created_at: Date;
                updated_at: Date;
                role: string;
                likedPosts: {
                    postId: number;
                    userId: string;
                }[];
            };
            Like: {
                postId: number;
                userId: string;
            }[];
            Comment: {
                id: number;
                content: string;
                postId: number;
                userId: string;
                created_at: Date;
                updated_at: Date;
                parentId: number | null;
            }[];
            id: number;
            content: string;
            userId: string;
            created_at: Date;
            updated_at: Date;
        }[];
        total: number;
    }>;
    createPost(data: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        content: string;
        userId: string;
        created_at: Date;
        updated_at: Date;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findById(id: number): Promise<{
        likes: number;
        User: {
            username: string;
            email: string;
            userAvatar: string;
            name: string;
            surname: string;
            id: string;
            userCover: string;
            bio: string;
            created_at: Date;
            updated_at: Date;
            role: string;
            likedPosts: {
                postId: number;
                userId: string;
            }[];
        };
        Like: {
            postId: number;
            userId: string;
        }[];
        Comment: ({
            user: {
                username: string;
                email: string;
                userAvatar: string;
                name: string;
                surname: string;
                id: string;
                userCover: string;
                bio: string;
                created_at: Date;
                updated_at: Date;
                password: string;
                role: string;
            };
        } & {
            id: number;
            content: string;
            postId: number;
            userId: string;
            created_at: Date;
            updated_at: Date;
            parentId: number | null;
        })[];
        id: number;
        content: string;
        userId: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findByUsername(page: number, limit: number, username: string): Promise<{
        data: {
            likes: number;
            User: {
                username: string;
                email: string;
                userAvatar: string;
                name: string;
                surname: string;
                id: string;
                userCover: string;
                bio: string;
                created_at: Date;
                updated_at: Date;
                role: string;
                likedPosts: {
                    postId: number;
                    userId: string;
                }[];
            };
            Like: {
                postId: number;
                userId: string;
            }[];
            Comment: {
                id: number;
                content: string;
                postId: number;
                userId: string;
                created_at: Date;
                updated_at: Date;
                parentId: number | null;
            }[];
            id: number;
            content: string;
            userId: string;
            created_at: Date;
            updated_at: Date;
        }[];
        total: number;
    }>;
    likePost(data: LikePostDto): Promise<{
        likes: number;
        Like: {
            postId: number;
            userId: string;
        }[];
        id: number;
        content: string;
        userId: string;
        created_at: Date;
        updated_at: Date;
    }>;
    unlikePost(data: LikePostDto): Promise<{
        likes: number;
        Like: {
            postId: number;
            userId: string;
        }[];
        id: number;
        content: string;
        userId: string;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(data: DeletePostDto): Promise<{
        id: number;
        content: string;
        userId: string;
        created_at: Date;
        updated_at: Date;
    }>;
    edit(data: EditPostDto): Promise<{
        id: number;
        content: string;
        userId: string;
        created_at: Date;
        updated_at: Date;
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
