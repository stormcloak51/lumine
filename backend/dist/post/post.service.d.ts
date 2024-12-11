import { PostModel } from '@prisma/client';
import { UpsertDraftDto, CreatePostDto, DeletePostDto, EditPostDto, LikePostDto } from '../dtos/post.dto';
import { PrismaService } from '../prisma.service';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
    findAllByUsername(page: number, limit: number, username: string): Promise<{
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
                role: string;
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
                role: string;
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
    createPost(data: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
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
    unLikePost(data: LikePostDto): Promise<{
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
            role: string;
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
                role: string;
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
    upsertDraft(userId: string, data: UpsertDraftDto): Promise<{
        id: number;
        content: string;
        userId: string;
    }>;
    getDraft(userId: string): Promise<{
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
}
