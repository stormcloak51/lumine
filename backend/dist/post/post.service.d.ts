import { PostModel } from '@prisma/client';
import { CreatePostDto, LikePostDto } from '../dtos/post.dto';
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
    findAllSortedByLikes(): Promise<PostModel[]>;
    createPost(data: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    likePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    unLikePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllByUsername(username: string): Promise<{
        likes: number;
        User: {
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
            role: string;
        };
        UserLike: {
            userId: string;
            postId: number;
        }[];
        id: number;
        created_at: Date;
        updated_at: Date;
        content: string;
        userId: string;
    }[]>;
}
