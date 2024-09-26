import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user: Partial<User>): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        created_at: Date;
        updated_at: Date;
        username: string;
        email: string;
        password: string;
        roles: import(".prisma/client").$Enums.Role[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    findOne(idOrEmail: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        created_at: Date;
        updated_at: Date;
        username: string;
        email: string;
        password: string;
        roles: import(".prisma/client").$Enums.Role[];
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    delete(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        created_at: Date;
        updated_at: Date;
        username: string;
        email: string;
        password: string;
        roles: import(".prisma/client").$Enums.Role[];
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
