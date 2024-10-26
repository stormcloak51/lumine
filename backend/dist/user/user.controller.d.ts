import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        created_at: Date;
        updated_at: Date;
        role: string;
    }[]>;
    findOne(idOrEmailOrUsername: string): Promise<{
        id: string;
        username: string;
        email: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        created_at: Date;
        role: string;
        likedPosts: {
            userId: string;
            postId: number;
        }[];
    }>;
}
