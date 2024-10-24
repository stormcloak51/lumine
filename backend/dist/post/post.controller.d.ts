import { PostModel } from '@prisma/client';
import { CreatePostDto, LikePostDto } from '../dtos/post.dto';
import { PostService } from './post.service';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        User: {
            username: string;
            name: string;
            surname: string;
            bio: string;
            userAvatar: string;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
        likes: number;
    })[]>;
    findAllSortedByLikes(): import(".prisma/client").Prisma.PrismaPromise<({
        User: {
            username: string;
            name: string;
            surname: string;
            bio: string;
            userAvatar: string;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
        likes: number;
    })[]>;
    createPost(data: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        User: {
            username: string;
            name: string;
            surname: string;
            bio: string;
            userAvatar: string;
        };
    } & {
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
        likes: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByUsername(username: string): Promise<PostModel[]>;
    likePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
        likes: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    unlikePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
        likes: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
