import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
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
    delete(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
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
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
