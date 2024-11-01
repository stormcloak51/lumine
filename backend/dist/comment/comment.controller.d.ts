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
            id: number;
            content: string;
            created_at: Date;
            updated_at: Date;
            postId: number;
            userId: string;
        }[];
        total: number;
    }>;
    create(dto: CreateCommentDto, postId: number): Promise<{
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
    } & {
        id: number;
        content: string;
        created_at: Date;
        updated_at: Date;
        postId: number;
        userId: string;
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
    }>;
    delete(dto: DeleteCommentDto): Promise<void>;
    edit(dto: EditCommentDto): Promise<void>;
}
