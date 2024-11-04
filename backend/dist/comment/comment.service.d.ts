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
            subComments: {
                Like: {
                    created_at: Date;
                    userId: string;
                    commentId: number;
                }[];
            }[];
            id: number;
            content: string;
            postId: number;
            created_at: Date;
            updated_at: Date;
            userId: string;
            parentId: number | null;
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
        parentId: number | null;
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
        parentId: number | null;
    }>;
    delete(dto: DeleteCommentDto): Promise<{
        id: number;
        content: string;
        postId: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        parentId: number | null;
    }>;
    edit(dto: EditCommentDto): import(".prisma/client").Prisma.Prisma__CommentClient<{
        id: number;
        content: string;
        postId: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        parentId: number | null;
    }, never, import("@prisma/client/runtime/library").DefaultArgs>;
    getSubcomments(dto: GetCommentsDto): Promise<{
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
            parentId: number | null;
        }[];
        total: number;
    }>;
    createSubcomment(dto: CreateCommentDto): Promise<{
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
        parentId: number | null;
    }>;
}
