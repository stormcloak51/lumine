import { PostModel } from '@prisma/client';
import { CreatePostDto, LikePostDto } from '../dtos/post.dto';
import { PrismaService } from '../prisma.service';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
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
                username: string;
                email: string;
                userAvatar: string;
                name: string;
                surname: string;
                id: string;
                created_at: Date;
                updated_at: Date;
                password: string;
                bio: string;
                role: string;
            };
            Like: {
                postId: number;
                userId: string;
            }[];
            Comment: {
                id: number;
                content: string;
                postId: number;
                created_at: Date;
                updated_at: Date;
                userId: string;
                parentId: number | null;
            }[];
            id: number;
            content: string;
            created_at: Date;
            updated_at: Date;
            userId: string;
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
                created_at: Date;
                updated_at: Date;
                password: string;
                bio: string;
                role: string;
            };
            Like: {
                postId: number;
                userId: string;
            }[];
            Comment: {
                id: number;
                content: string;
                postId: number;
                created_at: Date;
                updated_at: Date;
                userId: string;
                parentId: number | null;
            }[];
            id: number;
            content: string;
            created_at: Date;
            updated_at: Date;
            userId: string;
        }[];
        total: number;
    }>;
    createPost(data: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    likePost(data: LikePostDto): Promise<{
        likes: number;
        Like: {
            postId: number;
            userId: string;
        }[];
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
    unLikePost(data: LikePostDto): Promise<{
        likes: number;
        Like: {
            postId: number;
            userId: string;
        }[];
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
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
            created_at: Date;
            updated_at: Date;
            password: string;
            bio: string;
            role: string;
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
                created_at: Date;
                updated_at: Date;
                password: string;
                bio: string;
                role: string;
            };
        } & {
            id: number;
            content: string;
            postId: number;
            created_at: Date;
            updated_at: Date;
            userId: string;
            parentId: number | null;
        })[];
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
    delete(id: number): Promise<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
    edit(id: number, content: string): Promise<{
        User: {
            username: string;
            email: string;
            userAvatar: string;
            name: string;
            surname: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            password: string;
            bio: string;
            role: string;
        };
        Like: {
            postId: number;
            userId: string;
        }[];
        Comment: {
            id: number;
            content: string;
            postId: number;
            created_at: Date;
            updated_at: Date;
            userId: string;
            parentId: number | null;
        }[];
    } & {
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
}
