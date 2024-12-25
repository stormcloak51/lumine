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
exports.PostService = void 0;
const common_1 = require("@nestjs/common");
const user_constants_1 = require("../config/constants/user.constants");
const prisma_service_1 = require("../prisma/prisma.service");
let PostService = class PostService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    findAll() {
        return this.prisma.postModel.findMany();
    }
    async findAllSortedByLikes(page = 1, limit = 10) {
        const skip = (page - 1) * limit;
        const posts = await this.prisma.postModel.findMany({
            orderBy: {
                Like: {
                    _count: 'desc',
                },
            },
            include: {
                User: { select: user_constants_1.userSelect },
                Like: {
                    select: {
                        userId: true,
                        postId: true,
                    },
                },
                Comment: {
                    include: {
                        user: true,
                    },
                },
            },
            skip,
            take: Number(limit),
        });
        const total = await this.prisma.postModel.count();
        return {
            data: posts.map((post) => ({
                ...post,
                likes: post.Like.length,
            })),
            total,
        };
    }
    async findAllByUsername(page = 1, limit = 10, username) {
        const skip = (page - 1) * limit;
        const posts = await this.prisma.postModel.findMany({
            where: {
                User: {
                    username: username,
                },
            },
            orderBy: {
                created_at: 'desc',
            },
            include: {
                User: {
                    select: {
                        ...user_constants_1.userSelect,
                        likedPosts: true,
                    },
                },
                Like: true,
                Comment: true,
            },
            skip,
            take: Number(limit),
        });
        const total = await this.prisma.postModel.count({
            where: {
                User: {
                    username: username,
                },
            },
        });
        return {
            data: posts.map((post) => ({
                ...post,
                likes: post.Like.length,
            })),
            total,
        };
    }
    async findAllSortedByDate(page = 1, limit = 10) {
        try {
            const skip = (page - 1) * limit;
            const posts = await this.prisma.postModel.findMany({
                orderBy: {
                    created_at: 'desc',
                },
                include: {
                    User: {
                        select: {
                            ...user_constants_1.userSelect,
                            likedPosts: true,
                        },
                    },
                    Like: true,
                    Comment: true,
                },
                skip,
                take: Number(limit),
            });
            const total = await this.prisma.postModel.count();
            return {
                data: posts.map((post) => ({
                    ...post,
                    likes: post.Like.length,
                })),
                total,
            };
        }
        catch (error) {
            console.error('Find posts error:', error);
            throw new Error('Failed to fetch posts');
        }
    }
    createPost(data) {
        return this.prisma.postModel.create({
            data: {
                content: data.content,
                User: {
                    connect: {
                        id: data.id,
                        username: data.username,
                    },
                },
            },
            include: {
                User: true,
                Like: true,
                Comment: true,
            }
        });
    }
    async likePost(postId, userId) {
        const post = await this.prisma.postModel.findUnique({
            where: {
                id: postId
            },
            include: {
                Like: true
            }
        });
        if (!post) {
            throw new common_1.BadRequestException('Post not found');
        }
        const isLiked = post.Like.some(like => like.userId === userId);
        const updatedPost = await this.prisma.postModel.update({
            where: {
                id: postId,
            },
            data: {
                Like: isLiked ? {
                    delete: {
                        userId_postId: {
                            userId,
                            postId
                        }
                    }
                } : {
                    create: {
                        user: {
                            connect: {
                                id: userId
                            }
                        }
                    }
                }
            },
            include: {
                Like: true,
            },
        });
        return {
            ...updatedPost,
            likes: updatedPost.Like.length,
        };
    }
    async findById(id) {
        const post = await this.prisma.postModel.findUnique({
            where: {
                id,
            },
            include: {
                User: {
                    select: {
                        ...user_constants_1.userSelect,
                        likedPosts: true,
                    },
                },
                Like: {
                    select: {
                        userId: true,
                        postId: true,
                    },
                },
                Comment: {
                    include: {
                        user: true,
                    },
                },
            },
        });
        return {
            ...post,
            likes: post.Like.length,
        };
    }
    async delete(postId, userId) {
        if (!postId)
            throw new common_1.BadRequestException('Id not found');
        const post = await this.prisma.postModel.findUnique({
            where: {
                id: postId,
            },
        });
        if (post.userId !== userId)
            throw new common_1.BadRequestException("You can't update someones else's post!");
        return await this.prisma.postModel.delete({
            where: {
                id: postId,
            },
        });
    }
    async edit(data) {
        if (!data.postId)
            throw new common_1.BadRequestException('Id not found');
        const post = await this.prisma.postModel.findUnique({
            where: {
                id: data.postId,
            },
        });
        if (post.userId !== data.UserDtoId)
            throw new common_1.BadRequestException("You can't update someones else's post!");
        return await this.prisma.postModel.update({
            where: {
                id: data.postId,
            },
            data: {
                content: data.content,
            },
        });
    }
    async upsertDraft(userId, data) {
        const postDraft = await this.prisma.postDraft.findUnique({
            where: {
                userId,
            },
            include: {
                media: true,
            }
        });
        return await this.prisma.postDraft.upsert({
            where: {
                userId,
            },
            create: {
                userId,
                content: data.content || '',
                media: {
                    create: data?.media?.map((asset) => {
                        return {
                            key: asset.key,
                            url: asset.url,
                        };
                    }),
                },
            },
            update: {
                content: data.content,
                media: {
                    upsert: data?.media?.map(asset => {
                        return {
                            where: {
                                key: asset.key
                            },
                            create: {
                                key: asset.key,
                                url: asset.url
                            },
                            update: {
                                key: asset.key,
                                url: asset.url
                            }
                        };
                    })
                },
            },
        });
    }
    async deleteMediaDraft(userId, key) {
        return await this.prisma.postDraft.update({
            where: {
                userId,
            },
            data: {
                media: {
                    delete: {
                        key
                    }
                }
            }
        });
    }
    async getDraft(userId) {
        return await this.prisma.postDraft.findUnique({
            where: {
                userId,
            },
            include: {
                media: true,
            },
        });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
//# sourceMappingURL=post.service.js.map