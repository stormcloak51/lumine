export declare class UserDto {
    username: string;
    email: string;
    userAvatar: string;
    password: string;
    userCover: string;
    name: string;
    surname: string;
    id: string;
    bio: string;
    role: string;
    created_at: Date;
    updated_at: Date;
}
export declare class UpdateUserDto {
    name?: string;
    surname?: string;
    username?: string;
    email?: string;
    userAvatar?: string;
    userCover?: string;
    bio?: string;
}
