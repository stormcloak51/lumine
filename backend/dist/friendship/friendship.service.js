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
exports.FriendshipService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let FriendshipService = class FriendshipService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async getFriendRequests(userId) {
        return await this.prisma.friendRequest.findMany({
            where: {
                receiverId: userId,
                status: 'PENDING'
            },
            include: {
                sender: true,
            }
        });
    }
    async getFriendships(userId) {
        return await this.prisma.friendship.findMany({
            where: {
                OR: [
                    { userId },
                    { friendId: userId }
                ]
            },
        });
    }
    async getFriends(userId) {
        const friendships = await this.prisma.friendship.findMany({
            where: {
                OR: [
                    { userId },
                    { friendId: userId }
                ]
            },
            include: {
                user: true,
                friend: true
            }
        });
        return friendships.map(f => f.userId === userId ? f.friend : f.user);
    }
};
exports.FriendshipService = FriendshipService;
exports.FriendshipService = FriendshipService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendshipService);
//# sourceMappingURL=friendship.service.js.map