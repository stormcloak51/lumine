import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dtos/user.dto';
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
        userCover: string;
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
        updated_at: Date;
        password: string;
        bio: string;
        userCover: string;
        role: string;
    }>;
    update(id: string, dto: UpdateUserDto): Promise<{
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
        userCover: string;
        role: string;
    }>;
}
