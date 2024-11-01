import { PostModel } from '@prisma/client';
import { CreatePostDto, EditPostDto, LikePostDto } from '../dtos/post.dto';
import { PostService } from './post.service';
import { Request } from 'express';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
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
            }[];
            id: number;
            content: string;
            created_at: Date;
            updated_at: Date;
            userId: string;
        }[];
        total: number;
    }>;
    createPost(data: CreatePostDto, req: Request): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
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
        })[];
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
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
            }[];
            id: number;
            content: string;
            created_at: Date;
            updated_at: Date;
            userId: string;
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
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
    unlikePost(data: LikePostDto): Promise<{
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
    delete(id: number): Promise<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
    edit(data: EditPostDto): Promise<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
}
