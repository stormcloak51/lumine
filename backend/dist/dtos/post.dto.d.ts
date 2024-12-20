import { UserDto } from './user.dto';
export declare class CreatePostDto {
    content: string;
    UserDto: UserDto;
}
export declare class LikePostDto {
    postId: number;
    UserDto: UserDto;
}
export declare class EditPostDto {
    postId: number;
    UserDtoId: string;
    content: string;
}
export declare class DeletePostDto {
    postId: number;
    UserDtoId: string;
}
export declare class UpsertDraftDto {
    content: string;
    media: {
        url: string;
        key: string;
    }[];
}
