import { User } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(user: Partial<User>): Promise<{
        id: string;
        username: string;
        email: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.Role;
    }>;
    findOne(idOrEmailOrUsername: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        username: string;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.Role;
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        username: string;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.Role;
    }[]>;
    delete(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        username: string;
        email: string;
        password: string;
        created_at: Date;
        updated_at: Date;
        role: import(".prisma/client").$Enums.Role;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
