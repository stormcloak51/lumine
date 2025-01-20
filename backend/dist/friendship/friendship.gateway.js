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
exports.FriendshipGateway = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../prisma/prisma.service");
const common_1 = require("@nestjs/common");
const ws_auth_guard_1 = require("../auth/guards/ws-auth.guard");
let FriendshipGateway = class FriendshipGateway {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async handleFriendRequest(client, { receiverId }) {
        const senderId = client.data.user.id;
        try {
            const request = await this.prisma.friendRequest.create({
                data: {
                    senderId,
                    receiverId,
                    status: 'PENDING',
                },
                include: {
                    sender: true,
                },
            });
            this.server.to(receiverId).emit('friendRequest', {
                type: 'RECEIVED',
                request,
            });
            return { success: true, request };
        }
        catch (error) {
            return { success: false, error: 'Failed to send friend request' };
        }
    }
    async handleFriendResponse(socket, { requestId, accept }) {
        const userId = socket.data.user.id;
        try {
            const request = await this.prisma.friendRequest.findUnique({
                where: { senderId_receiverId: { senderId: userId, receiverId: requestId } },
                include: { sender: true, receiver: true },
            });
            if (!request || request.receiverId !== userId) {
                throw new Error('Invalid request');
            }
            if (accept) {
                await this.prisma.$transaction([
                    this.prisma.friendship.create({
                        data: {
                            userId: request.senderId,
                            friendId: request.receiverId,
                        },
                    }),
                    this.prisma.friendship.create({
                        data: {
                            userId: request.receiverId,
                            friendId: request.senderId,
                        },
                    }),
                    this.prisma.friendRequest.update({
                        where: { senderId_receiverId: {
                                senderId: request.senderId,
                                receiverId: request.receiverId,
                            }, },
                        data: { status: 'ACCEPTED' },
                    }),
                ]);
                this.server.to(request.senderId).emit('friendRequestAccepted', {
                    friend: request.receiver,
                });
                this.server.to(request.receiverId).emit('friendRequestAccepted', {
                    friend: request.sender,
                });
            }
            else {
                await this.prisma.friendRequest.update({
                    where: { senderId_receiverId: { senderId: request.senderId, receiverId: request.receiverId } },
                    data: { status: 'DECLINED' },
                });
                this.server.to(request.senderId).emit('friendRequestDeclined', {
                    requestId,
                });
            }
            return { success: true };
        }
        catch (error) {
            return { success: false, error: 'Failed to process friend request' };
        }
    }
    async handleRemoveFriend(socket, { friendId }) {
        const userId = socket.data.user.id;
        try {
            await this.prisma.$transaction([
                this.prisma.friendship.deleteMany({
                    where: {
                        OR: [
                            { userId, friendId },
                            { userId: friendId, friendId: userId },
                        ],
                    },
                }),
            ]);
            this.server.to(friendId).emit('friendRemoved', { userId });
            this.server.to(userId).emit('friendRemoved', { userId: friendId });
            return { success: true };
        }
        catch (error) {
            return { success: false, error: 'Failed to remove friend' };
        }
    }
};
exports.FriendshipGateway = FriendshipGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], FriendshipGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendFriendRequest'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendshipGateway.prototype, "handleFriendRequest", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('respondToFriendRequest'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], FriendshipGateway.prototype, "handleFriendResponse", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('removeFriend'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], FriendshipGateway.prototype, "handleRemoveFriend", null);
exports.FriendshipGateway = FriendshipGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: process.env.ORIGIN,
        },
    }),
    (0, common_1.UseGuards)(ws_auth_guard_1.WsAuthGuard),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendshipGateway);
//# sourceMappingURL=friendship.gateway.js.map