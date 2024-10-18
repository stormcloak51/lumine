import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './post.dto';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findByUsername(username: string): import(".prisma/client").Prisma.PrismaPromise<({
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
    })[]>;
}
