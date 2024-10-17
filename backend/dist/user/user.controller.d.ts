import { UserService } from './user.service';
import { Request } from 'express';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
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
    }[]>;
    findOne(idOrEmailOrUsername: string): Promise<{
        username: string;
        email: string;
        userAvatar: string;
        name: string;
        surname: string;
        id: string;
        created_at: Date;
        bio: string;
        role: string;
    }>;
    findCurrent(req: Request): Promise<void>;
}
