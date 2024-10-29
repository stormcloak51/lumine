import { CreateCommentDto, DeleteCommentDto, EditCommentDto, GetCommentsDto } from 'src/auth/dto/comment.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getById(dto: GetCommentsDto): Promise<({
        user: {
            id: string;
            username: string;
            name: string;
            userAvatar: string;
            likedComments: {
                userId: string;
                commentId: number;
            }[];
        };
        Like: {
            userId: string;
            commentId: number;
        }[];
    } & {
        id: number;
        content: string;
        postId: number;
        userId: string;
    })[]>;
    create(dto: CreateCommentDto, postId: number): Promise<{
        user: {
            id: string;
            username: string;
            email: string;
            password: string;
            name: string;
            surname: string;
            bio: string;
            userAvatar: string;
            created_at: Date;
            updated_at: Date;
            role: string;
        };
        Like: {
            userId: string;
            commentId: number;
        }[];
    } & {
        id: number;
        content: string;
        postId: number;
        userId: string;
    }>;
    delete(dto: DeleteCommentDto): Promise<{
        id: number;
        content: string;
        postId: number;
        userId: string;
    }>;
    edit(dto: EditCommentDto): import(".prisma/client").Prisma.Prisma__CommentClient<{
        id: number;
        content: string;
        postId: number;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
