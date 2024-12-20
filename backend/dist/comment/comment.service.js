"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let CommentService = class CommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getById(dto) {
        const comments = await this.prisma.comment.findMany({
            where: {
                postId: dto.postId,
                parentId: null
            },
            orderBy: {
                created_at: 'asc'
            },
            include: {
                user: {
                    select: {
                        id: true,
                        likedComments: true,
                        username: true,
                        userAvatar: true,
                        name: true,
                    }
                },
                Like: true,
                subComments: {
                    select: {
                        Like: true,
                    }
                }
            },
            skip: (dto.page - 1) * 5,
            take: 5
        });
        const total = await this.prisma.comment.count({
            where: {
                postId: dto.postId
            }
        });
        return {
            data: comments.map((comment) => ({
                ...comment,
                likes: comment.Like.length
            })),
            total,
        };
    }
    async create(dto, postId) {
        const comment = await this.prisma.comment.create({
            data: {
                post: {
                    connect: {
                        id: postId
                    }
                },
                user: {
                    connect: {
                        id: dto.userId
                    }
                },
                content: dto.content
            },
            include: {
                user: {
                    select: {
                        id: true,
                        likedComments: true,
                        username: true,
                        userAvatar: true,
                        name: true,
                    }
                },
                Like: true,
            }
        });
        return {
            ...comment,
            likes: comment.Like.length
        };
    }
    async likeComment(dto) {
        const comment = await this.prisma.comment.findUnique({
            where: {
                id: dto.commentId,
            },
            include: {
                Like: true
            }
        });
        if (!comment) {
            throw new common_1.BadRequestException('Comment not found');
        }
        const existingLike = await this.prisma.$transaction(async (prisma) => {
            const like = await prisma.commentLike.findFirst({
                where: {
                    AND: [
                        { userId: dto.userId },
                        { commentId: dto.commentId }
                    ]
                }
            });
            if (like) {
                await prisma.commentLike.deleteMany({
                    where: {
                        AND: [
                            { userId: dto.userId },
                            { commentId: dto.commentId }
                        ]
                    }
                });
                return like;
            }
            else {
                return await prisma.commentLike.create({
                    data: {
                        userId: dto.userId,
                        commentId: dto.commentId
                    }
                });
            }
        });
        const updatedComment = await this.prisma.comment.findUnique({
            where: {
                id: dto.commentId,
            },
            include: {
                user: {
                    select: {
                        id: true,
                        likedComments: true,
                        username: true,
                        userAvatar: true,
                        name: true,
                    }
                },
                Like: {
                    include: {
                        user: {
                            select: {
                                id: true
                            }
                        }
                    }
                }
            }
        });
        if (!updatedComment) {
            throw new common_1.BadRequestException('Failed to update comment');
        }
        return {
            ...updatedComment,
            likes: updatedComment.Like.length
        };
    }
    async delete(dto) {
        return await this.prisma.comment.delete({
            where: {
                id: dto.commentId,
                postId: dto.postId,
            }
        });
    }
    edit(dto) {
        const comment = this.prisma.comment.findUnique({
            where: {
                id: dto.commentId,
                postId: dto.postId
            }
        });
        if (!comment) {
            throw new Error('Comment not found');
        }
        return this.prisma.comment.update({
            where: {
                id: dto.commentId,
                postId: dto.postId,
            },
            data: {
                content: dto.content
            }
        });
    }
    async getSubcomments(dto) {
        const comments = await this.prisma.comment.findMany({
            where: {
                postId: dto.postId,
                parentId: dto.commentId
            },
            orderBy: {
                created_at: 'asc'
            },
            include: {
                user: {
                    select: {
                        id: true,
                        likedComments: true,
                        username: true,
                        userAvatar: true,
                        name: true,
                    }
                },
                Like: true
            },
            skip: (dto.page - 1) * 5,
            take: 5
        });
        const total = await this.prisma.comment.count({
            where: {
                postId: dto.postId,
                parentId: dto.commentId
            }
        });
        return {
            data: comments.map((comment) => ({
                ...comment,
                likes: comment.Like.length
            })),
            total,
        };
    }
    async createSubcomment(dto) {
        const comment = await this.prisma.comment.create({
            data: {
                postId: dto.postId,
                parentId: dto.commentId,
                userId: dto.userId,
                content: dto.content
            },
            include: {
                user: {
                    select: {
                        id: true,
                        likedComments: true,
                        username: true,
                        userAvatar: true,
                        name: true,
                    }
                },
                Like: true,
            }
        });
        return {
            ...comment,
            likes: comment.Like.length
        };
    }
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map