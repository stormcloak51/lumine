import { CommentService } from './comment.service';
import { CreateCommentDto, DeleteCommentDto, LikeCommentDto, EditCommentDto } from 'src/auth/dto/comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    get(postId: number, page?: number): Promise<{
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
    like(dto: LikeCommentDto): Promise<{
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
    delete(dto: DeleteCommentDto): Promise<void>;
    edit(dto: EditCommentDto): Promise<void>;
    getSubcomments(postId: number, commentId: number, page?: number): Promise<{
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
    createSubcomment(postId: number, commentId: number, userId: string, content: string): Promise<{
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
