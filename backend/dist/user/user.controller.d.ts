import { UserService } from './user.service';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        name: string;
        id: string;
        username: string;
        email: string;
        password: string;
        surname: string;
        bio: string;
        userAvatar: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.Role;
        access_token: string;
    }[]>;
    findOne(idOrEmailOrUsername: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        name: string;
        id: string;
        username: string;
        email: string;
        password: string;
        surname: string;
        bio: string;
        userAvatar: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.Role;
        access_token: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
}
