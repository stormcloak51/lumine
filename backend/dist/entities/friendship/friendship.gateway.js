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
const common_1 = require("@nestjs/common");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const prisma_service_1 = require("../../infrastructure/prisma/prisma.service");
let FriendshipGateway = class FriendshipGateway {
    constructor(prisma) {
        this.prisma = prisma;
        this.sentNotifications = new Set();
    }
    handleConnection(client) {
        const userId = client.handshake.query.userId;
        if (userId) {
            client.join(userId);
        }
        this.server.emit('user-joined', {
            message: `User ${client.id} joined the friendship namespace`,
        });
    }
    handleDisconnect(client) {
        client.leave(client.handshake.query.userId);
        this.server.emit('user-left', {
            message: `User ${client.id} left the friendship namespace`,
        });
    }
    async handleFriendRequest(client, data) {
        const userId = client.handshake.query.userId;
        if (!data?.receiverId) {
            console.log('something??');
            return { success: false, error: 'Receiver ID is required' };
        }
        if (!userId) {
            console.log('first');
            return { success: false, error: 'User not authenticated' };
        }
        if (userId === data.receiverId) {
            throw new common_1.ConflictException('Users cannot send friend requests to themselves');
        }
        try {
            const areUsersFriends = await this.prisma.friendship.findFirst({
                where: {
                    OR: [
                        { userId, friendId: data.receiverId },
                        { userId: data.receiverId, friendId: userId }
                    ]
                }
            });
            if (areUsersFriends) {
                throw new common_1.ConflictException('Users are already friends');
            }
            const existingRequest = await this.prisma.friendRequest.findFirst({
                where: {
                    senderId: userId,
                    receiverId: data.receiverId,
                    status: 'PENDING'
                }
            });
            if (existingRequest) {
                throw new common_1.ConflictException('Friend request already sent to this user');
            }
            const request = await this.prisma.friendRequest.upsert({
                where: {
                    senderId_receiverId: {
                        senderId: userId,
                        receiverId: data.receiverId
                    }
                },
                create: {
                    senderId: userId,
                    receiverId: data.receiverId,
                    status: 'PENDING'
                },
                update: {
                    status: 'PENDING'
                },
                include: {
                    sender: true,
                },
            });
            console.log('REQUEST', request);
            this.server.to(data.receiverId).emit('friendRequest', {
                type: 'RECEIVED',
                request,
            });
            client.emit('friendRequest', {
                message: 'Successfully sent friend request',
            });
            return { success: true, request };
        }
        catch (error) {
            console.error('Friend request error:', error);
            return { success: false, error: 'Failed to send friend request' };
        }
    }
    async acceptFriendRequest(client, data) {
        const userId = client.handshake.query.userId;
        console.log(userId, data.requestId);
        try {
            const friendship = await this.prisma.$transaction(async (tx) => {
                const friendRequest = await tx.friendRequest.findFirst({
                    where: {
                        receiverId: userId,
                        id: data.requestId,
                        status: "PENDING"
                    },
                });
                if (!friendRequest) {
                    throw new Error("Friend request not found");
                }
                await tx.friendRequest.update({
                    where: { senderId_receiverId: { senderId: friendRequest.senderId, receiverId: userId } },
                    data: { status: "ACCEPTED" },
                });
                return await tx.friendship.create({
                    data: {
                        userId: userId,
                        friendId: friendRequest.senderId,
                    },
                    include: {
                        friend: true,
                    },
                });
            });
            this.server.to(friendship.friendId).emit("friendRequestAccepted", {
                friendship,
            });
            client.emit("friendRequestAccepted", {
                message: "Successfully accepted friend request",
                friendship,
            });
            return { success: true, friendship };
        }
        catch (error) {
            console.error("Accept friend request error:", error);
            client.emit("friendRequestError", { message: "Failed to accept friend request" });
            return { success: false, error: 'Failed to accept friend request' };
        }
    }
    async declineFriendRequest(client, data) {
        const userId = client.handshake.query.userId;
        try {
            const request = await this.prisma.friendRequest.updateManyAndReturn({
                where: {
                    id: data.requestId
                },
                data: {
                    status: 'DECLINED'
                },
            });
            this.server.to(request[0].senderId).emit('friendRequest', {
                type: 'DECLINED',
                request
            });
            client.emit('friendRequest', {
                message: 'Successfully declined friend request'
            });
            return { success: true, request };
        }
        catch (error) {
            console.error('Decline friend request error:', error);
            return { success: false, error: 'Failed to decline friend request' };
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
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendshipGateway.prototype, "handleFriendRequest", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("acceptFriendRequest"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendshipGateway.prototype, "acceptFriendRequest", null);
__decorate([
    (0, websockets_1.SubscribeMessage)("declineFriendRequest"),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], FriendshipGateway.prototype, "declineFriendRequest", null);
exports.FriendshipGateway = FriendshipGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'friendship',
        origin: '*',
    }),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], FriendshipGateway);
//# sourceMappingURL=friendship.gateway.js.map