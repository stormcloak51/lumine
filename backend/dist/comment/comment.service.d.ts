import { CreateCommentDto, DeleteCommentDto, EditCommentDto, GetCommentsDto, LikeCommentDto } from 'src/auth/dto/comment.dto';
import { PrismaService } from 'src/prisma/prisma.service';
export declare class CommentService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    getById(dto: GetCommentsDto): Promise<{
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
    likeComment(dto: LikeCommentDto, userId: string): Promise<{
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
    delete(dto: DeleteCommentDto): Promise<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        postId: number;
        content: string;
        parentId: number | null;
    }>;
    edit(dto: EditCommentDto): import("@/prisma/__generated__").Prisma.Prisma__CommentClient<{
        id: number;
        created_at: Date;
        updated_at: Date;
        userId: string;
        postId: number;
        content: string;
        parentId: number | null;
    }, never, import("@/prisma/__generated__/runtime/library").DefaultArgs>;
    getSubcomments(dto: GetCommentsDto): Promise<{
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
    createSubcomment(postId: number, commentId: number, userId: string, content: string): Promise<{
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
