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
                    userId: string;
                    created_at: Date;
                    commentId: number;
                }[];
            };
            Like: {
                userId: string;
                created_at: Date;
                commentId: number;
            }[];
            subComments: {
                Like: {
                    userId: string;
                    created_at: Date;
                    commentId: number;
                }[];
            }[];
            id: number;
            content: string;
            postId: number;
            userId: string;
            created_at: Date;
            updated_at: Date;
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
                userId: string;
                created_at: Date;
                commentId: number;
            }[];
        };
        Like: {
            userId: string;
            created_at: Date;
            commentId: number;
        }[];
        id: number;
        content: string;
        postId: number;
        userId: string;
        created_at: Date;
        updated_at: Date;
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
                userId: string;
                created_at: Date;
                commentId: number;
            }[];
        };
        Like: ({
            user: {
                id: string;
            };
        } & {
            userId: string;
            created_at: Date;
            commentId: number;
        })[];
        id: number;
        content: string;
        postId: number;
        userId: string;
        created_at: Date;
        updated_at: Date;
        parentId: number | null;
    }>;
    delete(dto: DeleteCommentDto): Promise<{
        id: number;
        content: string;
        postId: number;
        userId: string;
        created_at: Date;
        updated_at: Date;
        parentId: number | null;
    }>;
    edit(dto: EditCommentDto): import(".prisma/client").Prisma.Prisma__CommentClient<{
        id: number;
        content: string;
        postId: number;
        userId: string;
        created_at: Date;
        updated_at: Date;
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
                    userId: string;
                    created_at: Date;
                    commentId: number;
                }[];
            };
            Like: {
                userId: string;
                created_at: Date;
                commentId: number;
            }[];
            id: number;
            content: string;
            postId: number;
            userId: string;
            created_at: Date;
            updated_at: Date;
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
                userId: string;
                created_at: Date;
                commentId: number;
            }[];
        };
        Like: {
            userId: string;
            created_at: Date;
            commentId: number;
        }[];
        id: number;
        content: string;
        postId: number;
        userId: string;
        created_at: Date;
        updated_at: Date;
        parentId: number | null;
    }>;
}
