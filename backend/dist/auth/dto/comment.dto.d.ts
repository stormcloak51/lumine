export declare class GetCommentsDto {
    postId: number;
    page: number;
}
export declare class CreateCommentDto {
    userId: string;
    postId: number;
    content: string;
}
export declare class DeleteCommentDto {
    commentId: number;
    postId: number;
}
export declare class EditCommentDto {
    commentId: number;
    postId: number;
    content: string;
}
export declare class LikeCommentDto {
    commentId: number;
    postId: number;
    userId: string;
}