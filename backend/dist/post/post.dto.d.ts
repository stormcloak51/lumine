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
export {};
