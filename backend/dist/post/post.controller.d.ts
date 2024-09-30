import { PostService } from './post.service';
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
}
