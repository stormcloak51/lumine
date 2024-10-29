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
const prisma_service_1 = require("../prisma.service");
let CommentService = class CommentService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getById(dto) {
        return await this.prisma.comment.findMany({
            where: {
                postId: dto.postId
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
            }
        });
    }
    async create(dto, postId) {
        return await this.prisma.comment.create({
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
                user: true,
                Like: true,
            }
        });
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
};
exports.CommentService = CommentService;
exports.CommentService = CommentService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CommentService);
//# sourceMappingURL=comment.service.js.map