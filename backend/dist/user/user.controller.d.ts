import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dtos/user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    findAll(): import("@/prisma/__generated__").Prisma.PrismaPromise<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        userCover: string;
        role: import("@/prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }[]>;
    findOne(idOrEmailOrUsername: string): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        userCover: string;
        role: import("@/prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        userCover: string;
        role: import("@/prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
}
