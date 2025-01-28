import { Prisma } from 'prisma/__generated__';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from 'src/dtos/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: RegisterDto): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        userCover: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
    findOne(idOrEmailOrUsername: string): Prisma.Prisma__UserClient<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        userCover: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }, null, import("@/prisma/__generated__/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
    checkUserExists(dto: RegisterDto): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        userCover: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(): Prisma.PrismaPromise<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        userCover: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }[]>;
    update({ id, dto }: {
        id: string;
        dto: UpdateUserDto;
    }): Promise<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        userCover: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(id: string): Prisma.Prisma__UserClient<{
        id: string;
        username: string;
        email: string;
        password: string;
        name: string;
        surname: string;
        bio: string;
        userAvatar: string;
        userCover: string;
        role: import("prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }, never, import("@/prisma/__generated__/runtime/library").DefaultArgs, Prisma.PrismaClientOptions>;
}
