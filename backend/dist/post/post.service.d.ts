import { PostModel } from '@prisma/client';
import { UpsertDraftDto, CreatePostDto, DeletePostDto, EditPostDto, LikePostDto } from '../dtos/post.dto';
import { PrismaService } from '../prisma.service';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findAllByUsername(page: number, limit: number, username: string): Promise<{
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
    unLikePost(data: LikePostDto): Promise<{
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
    upsertDraft(userId: string, data: UpsertDraftDto): Promise<{
        id: number;
        content: string;
        userId: string;
        media: string[];
    }>;
    getDraft(userId: string): Promise<{
        id: number;
        content: string;
        userId: string;
        media: string[];
    }>;
}
