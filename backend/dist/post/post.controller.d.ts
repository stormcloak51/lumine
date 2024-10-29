import { PostModel } from '@prisma/client';
import { CreatePostDto, EditPostDto, LikePostDto } from '../dtos/post.dto';
import { PostService } from './post.service';
import { Request } from 'express';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
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
    createPost(data: CreatePostDto, req: Request): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByUsername(req: Request, username: string): Promise<PostModel[]>;
    likePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    unlikePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: number): Promise<{
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
}
