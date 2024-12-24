import { CommentService } from './comment.service';
import { CreateCommentDto, DeleteCommentDto, LikeCommentDto, EditCommentDto } from 'src/auth/dto/comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    get(postId: number, page?: number): Promise<{
        data: {
            likes: number;
            user: {
                id: string;
                username: string;
                name: string;
                userAvatar: string;
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
            created_at: Date;
            updated_at: Date;
            postId: number;
            userId: string;
            parentId: number | null;
        }[];
        total: number;
    }>;
    create(dto: CreateCommentDto, userId: string): Promise<{
        likes: number;
        user: {
            id: string;
            username: string;
            name: string;
            userAvatar: string;
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
        created_at: Date;
        updated_at: Date;
        postId: number;
        userId: string;
        parentId: number | null;
    }>;
    like(dto: LikeCommentDto): Promise<{
        likes: number;
        user: {
            id: string;
            username: string;
            name: string;
            userAvatar: string;
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
        created_at: Date;
        updated_at: Date;
        postId: number;
        userId: string;
        parentId: number | null;
    }>;
    delete(dto: DeleteCommentDto): Promise<void>;
    edit(dto: EditCommentDto): Promise<void>;
    getSubcomments(postId: number, commentId: number, page?: number): Promise<{
        data: {
            likes: number;
            user: {
                id: string;
                username: string;
                name: string;
                userAvatar: string;
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
            created_at: Date;
            updated_at: Date;
            postId: number;
            userId: string;
            parentId: number | null;
        }[];
        total: number;
    }>;
    createSubcomment(postId: number, commentId: number, content: string, userId: string): Promise<{
        likes: number;
        user: {
            id: string;
            username: string;
            name: string;
            userAvatar: string;
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
        created_at: Date;
        updated_at: Date;
        postId: number;
        userId: string;
        parentId: number | null;
    }>;
}
