import { Prisma } from '@prisma/client';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from 'src/dtos/user.dto';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: RegisterDto): Promise<{
        username: string;
        email: string;
        userAvatar: string;
        name: string;
        surname: string;
        id: string;
        userCover: string;
        bio: string;
        created_at: Date;
        updated_at: Date;
        password: string;
        role: string;
    }>;
    findOne(idOrEmailOrUsername: string): Prisma.Prisma__UserClient<{
        username: string;
        email: string;
        userAvatar: string;
        name: string;
        surname: string;
        id: string;
        userCover: string;
        bio: string;
        created_at: Date;
        updated_at: Date;
        password: string;
        role: string;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): Prisma.PrismaPromise<{
        username: string;
        email: string;
        userAvatar: string;
        name: string;
        surname: string;
        id: string;
        userCover: string;
        bio: string;
        created_at: Date;
        updated_at: Date;
        password: string;
        role: string;
    }[]>;
    update({ id, dto }: {
        id: string;
        dto: UpdateUserDto;
    }): Promise<{
        username: string;
        email: string;
        userAvatar: string;
        name: string;
        surname: string;
        id: string;
        userCover: string;
        bio: string;
        created_at: Date;
        updated_at: Date;
        password: string;
        role: string;
    }>;
    delete(id: string): Prisma.Prisma__UserClient<{
        username: string;
        email: string;
        userAvatar: string;
        name: string;
        surname: string;
        id: string;
        userCover: string;
        bio: string;
        created_at: Date;
        updated_at: Date;
        password: string;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
