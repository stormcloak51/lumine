import { PrismaService } from '../prisma.service';
export declare class PostService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): import(".prisma/client").Prisma.PrismaPromise<{
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }[]>;
}
