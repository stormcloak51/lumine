export declare class CreatePostDto {
    content: string;
}
export declare class EditPostDto {
    postId: number;
    UserDtoId: string;
    content: string;
}
export declare class UpsertDraftDto {
    content: string;
    media: {
        url: string;
        key: string;
    }[];
}
