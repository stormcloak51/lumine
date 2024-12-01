import { Prisma } from '@prisma/client';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from 'src/dtos/user.dto';
import { PrismaService } from 'src/prisma.service';
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
        created_at: Date;
        updated_at: Date;
        role: string;
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
        created_at: Date;
        updated_at: Date;
        role: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
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
        created_at: Date;
        updated_at: Date;
        role: string;
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
        created_at: Date;
        updated_at: Date;
        role: string;
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
        created_at: Date;
        updated_at: Date;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
