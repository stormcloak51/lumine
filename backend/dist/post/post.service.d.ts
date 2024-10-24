import { CreatePostDto, LikePostDto } from '../dtos/post.dto';
import { PrismaService } from '../prisma.service';
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
    likePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
        likes: number;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    unLikePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
        likes: number;
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
        likes: number;
    })[]>;
}
