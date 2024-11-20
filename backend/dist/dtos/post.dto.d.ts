declare class User {
    username: string;
    email: string;
    userAvatar: string;
    name: string;
    surname: string;
    id: string;
}
export declare class CreatePostDto {
    content: string;
    User: User;
}
export declare class LikePostDto {
    postId: number;
    user: User;
}
export declare class EditPostDto {
    postId: number;
    userId: string;
    content: string;
}
export declare class DeletePostDto {
    postId: number;
    userId: string;
}
export {};
