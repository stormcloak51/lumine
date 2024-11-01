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
const prisma_service_1 = require("../prisma.service");
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
                User: true,
                Like: {
                    select: {
                        userId: true,
                        postId: true,
                    },
                },
                Comment: {
                    include: {
                        user: true,
                    }
                }
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
                User: true,
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
        const posts = await this.prisma.postModel.findMany({
            orderBy: {
                created_at: 'desc',
            },
            include: {
                User: true,
                Like: true,
                Comment: true,
            },
            skip: (page - 1) * limit,
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
    createPost(data) {
        return this.prisma.postModel.create({
            data: {
                content: data.content,
                User: {
                    connect: {
                        id: data.User.id,
                        username: data.User.username,
                    },
                },
            },
        });
    }
    async likePost(data) {
        const post = await this.prisma.postModel.update({
            where: {
                id: data.postId,
            },
            data: {
                Like: {
                    create: {
                        user: {
                            connect: {
                                id: data.user.id,
                                username: data.user.username,
                            },
                        },
                    },
                },
            },
            include: {
                Like: true,
            },
        });
        return {
            ...post,
            likes: post.Like.length,
        };
    }
    async unLikePost(data) {
        const post = await this.prisma.postModel.update({
            where: {
                id: data.postId,
            },
            data: {
                Like: {
                    delete: {
                        userId_postId: {
                            userId: data.user.id,
                            postId: data.postId,
                        },
                    },
                },
            },
            include: {
                Like: true,
            }
        });
        return {
            ...post,
            likes: post.Like.length,
        };
    }
    async findById(id) {
        const post = await this.prisma.postModel.findUnique({
            where: {
                id
            },
            include: {
                User: true,
                Like: {
                    select: {
                        userId: true,
                        postId: true,
                    },
                },
                Comment: {
                    include: {
                        user: true,
                    }
                }
            },
        });
        return {
            ...post,
            likes: post.Like.length,
        };
    }
    async delete(id) {
        return await this.prisma.postModel.delete({
            where: {
                id,
            },
        });
    }
    async edit(id, content) {
        return await this.prisma.postModel.update({
            where: {
                id,
            },
            data: {
                content,
            }
        });
    }
};
exports.PostService = PostService;
exports.PostService = PostService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PostService);
//# sourceMappingURL=post.service.js.map