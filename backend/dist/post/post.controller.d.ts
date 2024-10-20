import { PostService } from './post.service';
import { PostModel } from '@prisma/client';
import { CreatePostDto } from './post.dto';
export declare class PostController {
    private readonly postService;
    constructor(postService: PostService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<({
        User: {
            username: string;
            userAvatar: string;
            name: string;
            surname: string;
            bio: string;
        };
    } & {
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    })[]>;
    createPost(data: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        User: {
            username: string;
            userAvatar: string;
            name: string;
            surname: string;
            bio: string;
        };
    } & {
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByUsername(username: string): Promise<PostModel[]>;
}
