import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './post.dto';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    findByUsername(username: string): import(".prisma/client").Prisma.PrismaPromise<({
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
}
