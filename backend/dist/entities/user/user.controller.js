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
exports.UserController = void 0;
const user_dto_1 = require("../../infrastructure/dtos/user.dto");
const common_1 = require("@nestjs/common");
const auth_decorator_1 = require("../auth/decorators/auth.decorator");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
const user_decorator_1 = require("../auth/decorators/user.decorator");
const user_service_1 = require("./user.service");
let UserController = class UserController {
    constructor(userService, prisma) {
        this.userService = userService;
        this.prisma = prisma;
    }
    findAll() {
        return this.userService.findAll();
    }
    async findOne(idOrEmailOrUsername) {
        const user = await this.userService.findOne(idOrEmailOrUsername);
        console.log(123123);
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    { userId: user.id },
                    { friendId: user.id }
                ]
            },
            include: {
                user: true,
                friend: true
            }
        });
        const mappedFriends = friendships.map(friendship => {
            const friendData = friendship.userId === user.id
                ? friendship.friend
                : friendship.user;
            return {
                id: friendship.id,
                createdAt: friendship.createdAt,
                user: friendData
            };
        });
        const sortedFriends = mappedFriends.sort((a, b) => a.user.username.localeCompare(b.user.username));
        return {
            ...user,
            friends: sortedFriends,
            friendsOf: undefined
        };
    }
    update(id, dto) {
        return this.userService.update({ id, dto });
    }
};
exports.UserController = UserController;
__decorate([
    (0, auth_decorator_1.Authorization)('ADMIN'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, common_1.Get)('all'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], UserController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':idOrEmailOrUsername'),
    __param(0, (0, common_1.Param)('idOrEmailOrUsername')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, auth_decorator_1.Authorization)(),
    (0, common_1.Patch)(),
    __param(0, (0, user_decorator_1.CurrentUser)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, user_dto_1.UpdateUserDto]),
    __metadata("design:returntype", void 0)
], UserController.prototype, "update", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('user'),
    __metadata("design:paramtypes", [user_service_1.UserService,
        prisma_service_1.PrismaService])
], UserController);
//# sourceMappingURL=user.controller.js.map