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
    findAllSortedByLikes(): Promise<PostModel[]>;
    createPost(data: CreatePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    likePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    unLikePost(data: LikePostDto): import(".prisma/client").Prisma.Prisma__PostModelClient<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findAllByUsername(username: string): Promise<{
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
        UserLike: {
            postId: number;
            userId: string;
        }[];
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }[]>;
    delete(id: number): Promise<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
    edit(id: number, content: string): Promise<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
}
