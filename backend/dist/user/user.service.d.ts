import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from 'src/dtos/user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: RegisterDto): Promise<{
        name: string;
        surname: string;
        username: string;
        email: string;
        password: string;
        userAvatar: string;
        userCover: string;
        id: string;
        bio: string;
        role: import("@/prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
    findOne(idOrEmailOrUsername: string): import("@/prisma/__generated__").Prisma.Prisma__UserClient<{
        name: string;
        surname: string;
        username: string;
        email: string;
        password: string;
        userAvatar: string;
        userCover: string;
        id: string;
        bio: string;
        role: import("@/prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }, null, import("@/prisma/__generated__/runtime/library").DefaultArgs>;
    findAll(): import("@/prisma/__generated__").Prisma.PrismaPromise<{
        name: string;
        surname: string;
        username: string;
        email: string;
        password: string;
        userAvatar: string;
        userCover: string;
        id: string;
        bio: string;
        role: import("@/prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }[]>;
    update({ id, dto }: {
        id: string;
        dto: UpdateUserDto;
    }): Promise<{
        name: string;
        surname: string;
        username: string;
        email: string;
        password: string;
        userAvatar: string;
        userCover: string;
        id: string;
        bio: string;
        role: import("@/prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(id: string): import("@/prisma/__generated__").Prisma.Prisma__UserClient<{
        name: string;
        surname: string;
        username: string;
        email: string;
        password: string;
        userAvatar: string;
        userCover: string;
        id: string;
        bio: string;
        role: import("@/prisma/__generated__").$Enums.RoleType;
        created_at: Date;
        updated_at: Date;
    }, never, import("@/prisma/__generated__/runtime/library").DefaultArgs>;
}
