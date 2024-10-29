import { RegisterDto } from 'src/auth/dto/register.dto';
import { PrismaService } from 'src/prisma.service';
export declare class UserService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(dto: RegisterDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        username: string;
        email: string;
        password: string;
        surname: string;
        bio: string;
        userAvatar: string;
        role: string;
    }>;
    findOne(idOrEmailOrUsername: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        created_at: Date;
        name: string;
        username: string;
        email: string;
        surname: string;
        bio: string;
        userAvatar: string;
        role: string;
        likedPosts: {
            userId: string;
            postId: number;
        }[];
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        username: string;
        email: string;
        password: string;
        surname: string;
        bio: string;
        userAvatar: string;
        role: string;
    }[]>;
    delete(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        username: string;
        email: string;
        password: string;
        surname: string;
        bio: string;
        userAvatar: string;
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
