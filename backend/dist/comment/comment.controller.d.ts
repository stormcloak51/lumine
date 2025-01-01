import { CommentService } from './comment.service';
import { CreateCommentDto, DeleteCommentDto, LikeCommentDto, EditCommentDto } from 'src/auth/dto/comment.dto';
export declare class CommentController {
    private readonly commentService;
    constructor(commentService: CommentService);
    get(postId: number, page?: number): Promise<{
        data: {
            likes: number;
            user: {
                name: string;
                surname: string;
                username: string;
                email: string;
                userAvatar: string;
                userCover: string;
                id: string;
                bio: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
                created_at: Date;
                updated_at: Date;
                likedPosts: {
                    userId: string;
                    postId: number;
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
            created_at: Date;
            updated_at: Date;
            userId: string;
            postId: number;
            content: string;
            parentId: number | null;
        }[];
        total: number;
    }>;
    create(dto: CreateCommentDto, userId: string): Promise<{
        likes: number;
        user: {
            name: string;
            surname: string;
            username: string;
            email: string;
            userAvatar: string;
            userCover: string;
            id: string;
            bio: string;
            role: import("@/prisma/__generated__").$Enums.RoleType;
            created_at: Date;
            updated_at: Date;
            likedPosts: {
                userId: string;
                postId: number;
            }[];
        };
        Like: {
            created_at: Date;
            userId: string;
            commentId: number;
        }[];
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        postId: number;
        content: string;
        parentId: number | null;
    }>;
    like(dto: LikeCommentDto, userId: string): Promise<{
        likes: number;
        user: {
            name: string;
            surname: string;
            username: string;
            email: string;
            userAvatar: string;
            userCover: string;
            id: string;
            bio: string;
            role: import("@/prisma/__generated__").$Enums.RoleType;
            created_at: Date;
            updated_at: Date;
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
        created_at: Date;
        updated_at: Date;
        userId: string;
        postId: number;
        content: string;
        parentId: number | null;
    }>;
    delete(dto: DeleteCommentDto): Promise<void>;
    edit(dto: EditCommentDto): Promise<void>;
    getSubcomments(postId: number, commentId: number, page?: number): Promise<{
        data: {
            likes: number;
            user: {
                name: string;
                surname: string;
                username: string;
                email: string;
                userAvatar: string;
                userCover: string;
                id: string;
                bio: string;
                role: import("@/prisma/__generated__").$Enums.RoleType;
                created_at: Date;
                updated_at: Date;
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
            created_at: Date;
            updated_at: Date;
            userId: string;
            postId: number;
            content: string;
            parentId: number | null;
        }[];
        total: number;
    }>;
    createSubcomment(postId: number, commentId: number, content: string, userId: string): Promise<{
        likes: number;
        user: {
            name: string;
            surname: string;
            username: string;
            email: string;
            userAvatar: string;
            userCover: string;
            id: string;
            bio: string;
            role: import("@/prisma/__generated__").$Enums.RoleType;
            created_at: Date;
            updated_at: Date;
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
        created_at: Date;
        updated_at: Date;
        userId: string;
        postId: number;
        content: string;
        parentId: number | null;
    }>;
}
