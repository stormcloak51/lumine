import { RegisterDto } from 'src/auth/dto/register.dto';
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
        created_at: Date;
        updated_at: Date;
        password: string;
        bio: string;
        role: string;
    }>;
    findOne(idOrEmailOrUsername: string): import(".prisma/client").Prisma.Prisma__UserClient<{
        username: string;
        email: string;
        userAvatar: string;
        name: string;
        surname: string;
        id: string;
        created_at: Date;
        bio: string;
        role: string;
        likedPosts: {
            postId: number;
            userId: string;
        }[];
    }, null, import("@prisma/client/runtime/library").DefaultArgs>;
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
        role: string;
    }[]>;
    delete(id: string): import(".prisma/client").Prisma.Prisma__UserClient<{
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
        role: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
