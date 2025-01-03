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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CommentController = void 0;
const common_1 = require("@nestjs/common");
const comment_service_1 = require("./comment.service");
const comment_dto_1 = require("../auth/dto/comment.dto");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let CommentController = class CommentController {
    constructor(commentService) {
        this.commentService = commentService;
    }
    async get(postId, page = 1) {
        return await this.commentService.getById({ postId, page });
    }
    async create(dto, userId) {
        return await this.commentService.create(dto, userId);
    }
    async like(dto, userId) {
        return this.commentService.likeComment(dto, userId);
    }
    async delete(dto) {
        this.commentService.delete(dto);
    }
    async edit(dto) {
        this.commentService.edit(dto);
    }
    async getSubcomments(postId, commentId, page = 1) {
        return await this.commentService.getSubcomments({
            postId,
            commentId,
            page,
        });
    }
    async createSubcomment(postId, commentId, content, userId) {
        const dto = { content, userId, commentId, postId };
        return await this.commentService.createSubcomment(postId, commentId, userId, content);
    }
};
exports.CommentController = CommentController;
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Get)('getById'),
    __param(0, (0, common_1.Query)('postId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "get", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.CreateCommentDto, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "create", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Post)('like'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.LikeCommentDto, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "like", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.DeleteCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "delete", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Patch)('edit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [comment_dto_1.EditCommentDto]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "edit", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Get)('getSubcomments'),
    __param(0, (0, common_1.Query)('postId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('commentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "getSubcomments", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Post)('createSubcomment'),
    __param(0, (0, common_1.Body)('postId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Body)('commentId', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Body)('content')),
    __param(3, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String]),
    __metadata("design:returntype", Promise)
], CommentController.prototype, "createSubcomment", null);
exports.CommentController = CommentController = __decorate([
    (0, common_1.Controller)('comment'),
    __metadata("design:paramtypes", [comment_service_1.CommentService])
], CommentController);
//# sourceMappingURL=comment.controller.js.map