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
exports.PostController = void 0;
const common_1 = require("@nestjs/common");
const post_dto_1 = require("../dtos/post.dto");
const post_service_1 = require("./post.service");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
let PostController = class PostController {
    constructor(postService) {
        this.postService = postService;
    }
    findAll() {
        return this.postService.findAll();
    }
    findAllSortedByLikes(page = 1, limit = 10) {
        return this.postService.findAllSortedByLikes(page, limit);
    }
    findAllSortedByDate(page = 1, limit = 10) {
        return this.postService.findAllSortedByDate(page, limit);
    }
    createPost(data, user) {
        return this.postService.createPost({ ...data, ...user });
    }
    findById(id) {
        return this.postService.findById(id);
    }
    findByUsername(page = 1, limit = 10, username) {
        return this.postService.findAllByUsername(page, limit, username);
    }
    likePost(postId, userId) {
        return this.postService.likePost(postId, userId);
    }
    delete(postId, userId) {
        return this.postService.delete(postId, userId);
    }
    edit(data) {
        return this.postService.edit(data);
    }
    getDraft(user) {
        return this.postService.getDraft(user.id);
    }
    upsertDraft(data, user) {
        return this.postService.upsertDraft(user.id, data);
    }
    deleteMediaDraft(key, user) {
        return this.postService.deleteMediaDraft(user.id, key);
    }
};
exports.PostController = PostController;
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAll", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Get)('sortedByLikes'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAllSortedByLikes", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Get)('sortedByDate'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findAllSortedByDate", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.CreatePostDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "createPost", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Get)('findById'),
    __param(0, (0, common_1.Query)('id', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findById", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Get)('findByUsername'),
    __param(0, (0, common_1.Query)('page')),
    __param(1, (0, common_1.Query)('limit')),
    __param(2, (0, common_1.Query)('username')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "findByUsername", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Patch)('like'),
    __param(0, (0, common_1.Body)('postId', common_1.ParseIntPipe)),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "likePost", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Delete)('delete'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "delete", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Patch)('edit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.EditPostDto]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "edit", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Get)('getDraft'),
    __param(0, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "getDraft", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Post)('upsertDraft'),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [post_dto_1.UpsertDraftDto, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "upsertDraft", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Delete)('deleteMediaDraft'),
    __param(0, (0, common_1.Body)('key')),
    __param(1, (0, user_decorator_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], PostController.prototype, "deleteMediaDraft", null);
exports.PostController = PostController = __decorate([
    (0, common_1.Controller)('post'),
    __metadata("design:paramtypes", [post_service_1.PostService])
], PostController);
//# sourceMappingURL=post.controller.js.map