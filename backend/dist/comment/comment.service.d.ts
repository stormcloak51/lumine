import { CreateCommentDto, DeleteCommentDto, LikeCommentDto, EditCommentDto, GetCommentsDto } from 'src/auth/dto/comment.dto';
import { PrismaService } from 'src/prisma.service';
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getById(dto: GetCommentsDto): Promise<{
        data: {
            likes: number;
            user: {
                username: string;
                userAvatar: string;
                name: string;
                id: string;
                likedComments: {
                    created_at: Date;
                    userId: string;
                    commentId: number;
                }[];
            };
            Like: {
                created_at: Date;
                userId: string;
                commentId: number;
            }[];
            id: number;
            content: string;
            postId: number;
            created_at: Date;
            updated_at: Date;
            userId: string;
        }[];
        total: number;
    }>;
    create(dto: CreateCommentDto, postId: number): Promise<{
        likes: number;
        user: {
            username: string;
            userAvatar: string;
            name: string;
            id: string;
            likedComments: {
                created_at: Date;
                userId: string;
                commentId: number;
            }[];
        };
        Like: {
            created_at: Date;
            userId: string;
            commentId: number;
        }[];
        id: number;
        content: string;
        postId: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
    likeComment(dto: LikeCommentDto): Promise<{
        likes: number;
        user: {
            username: string;
            userAvatar: string;
            name: string;
            id: string;
            likedComments: {
                created_at: Date;
                userId: string;
                commentId: number;
            }[];
        };
        Like: ({
            user: {
                id: string;
            };
        } & {
            created_at: Date;
            userId: string;
            commentId: number;
        })[];
        id: number;
        content: string;
        postId: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
    delete(dto: DeleteCommentDto): Promise<{
        id: number;
        content: string;
        postId: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }>;
    edit(dto: EditCommentDto): import(".prisma/client").Prisma.Prisma__CommentClient<{
        id: number;
        content: string;
        postId: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
}
