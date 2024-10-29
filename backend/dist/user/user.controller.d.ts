import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    findOne(idOrEmailOrUsername: string): Promise<{
        id: string;
        created_at: Date;
        name: string;
        username: string;
        email: string;
        surname: string;
        bio: string;
        userAvatar: string;
        role: string;
        likedPosts: {
            userId: string;
            postId: number;
        }[];
    }>;
}
