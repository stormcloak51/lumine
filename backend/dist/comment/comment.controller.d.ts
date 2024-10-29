import { CommentService } from './comment.service';
import { CreateCommentDto, DeleteCommentDto, EditCommentDto } from 'src/auth/dto/comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    get(postId: number): Promise<({
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
    delete(dto: DeleteCommentDto): Promise<void>;
    edit(dto: EditCommentDto): Promise<void>;
}
