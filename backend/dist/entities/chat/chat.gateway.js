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
var ChatGateway_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ChatGateway = void 0;
const common_1 = require("@nestjs/common");
const event_emitter_1 = require("@nestjs/event-emitter");
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
const chat_service_1 = require("./chat.service");
let ChatGateway = ChatGateway_1 = class ChatGateway {
    constructor(chatService) {
        this.chatService = chatService;
        this.logger = new common_1.Logger(ChatGateway_1.name);
        this.userSockets = new Map();
    }
    async handleConnection(client) {
        try {
            const userId = client.handshake.query.userId;
            if (!userId) {
                this.logger.error('Client disconnected: No userId provided');
                client.disconnect();
                return;
            }
            client.data = { userId };
            if (!this.userSockets.has(userId)) {
                this.userSockets.set(userId, []);
            }
            this.userSockets.get(userId).push(client.id);
            client.join(userId);
            this.logger.log(`Client ${client.id} joined their user room: ${userId}`);
            this.logger.log(`Client connected: ${client.id}, User: ${userId}`);
        }
        catch (error) {
            this.logger.error(`Error handling connection: ${error.message}`);
            client.disconnect();
        }
    }
    handleDisconnect(client) {
        const userId = client.data.userId;
        if (userId) {
            const sockets = this.userSockets.get(userId) || [];
            const index = sockets.indexOf(client.id);
            if (index !== -1) {
                sockets.splice(index, 1);
                if (sockets.length === 0) {
                    this.userSockets.delete(userId);
                }
                else {
                    this.userSockets.set(userId, sockets);
                }
            }
        }
        this.logger.log(`Client disconnected: ${client.id}`);
    }
    async handleJoinChat(client, data) {
        try {
            const userId = client.data.userId;
            if (!userId)
                return { success: false, error: 'Unauthorized' };
            const isMember = await this.chatService.isUserMemberOfChat(data.chatId, userId);
            if (!isMember) {
                this.logger.warn(`User ${userId} attempted to join chat ${data.chatId} but is not a member`);
                return { success: false, error: 'Not a member of this chat' };
            }
            client.join(data.chatId);
            this.logger.log(`Client ${client.id} (User ${userId}) joined chat room: ${data.chatId}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Error joining chat: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    async handleLeaveChat(client, data) {
        try {
            client.leave(data.chatId);
            this.logger.log(`Client ${client.id} left chat ${data.chatId}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Error leaving chat: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    async handleSendMessage(client, data) {
        try {
            const userId = client.data.userId;
            if (!userId)
                return { success: false, error: 'Unauthorized' };
            this.logger.log(`User ${userId} sent message to chat ${data.chatId}: "${data.content.substring(0, 20)}${data.content.length > 20 ? '...' : ''}"`);
            const message = await this.chatService.createMessage(data.chatId, userId, data.content);
            const chat = await this.chatService.getChatById(data.chatId);
            if (chat && chat.members) {
                this.logger.log(`Broadcasting message ${message.id} to ${chat.members.length} members of chat ${data.chatId}`);
                this.server.to(data.chatId).emit('newMessage', {
                    chatId: data.chatId,
                    message: message
                });
                for (const member of chat.members) {
                    this.logger.log(`Sending message ${message.id} directly to user ${member.id}`);
                    this.server.to(member.id).emit('newMessage', {
                        chatId: data.chatId,
                        message: message
                    });
                    this.server.to(member.id).emit('chatUpdated', {
                        chatId: data.chatId,
                        lastMessage: message
                    });
                }
            }
            return { success: true, message };
        }
        catch (error) {
            this.logger.error(`Error sending message: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    async handleMarkMessageRead(client, data) {
        try {
            const userId = client.data.userId;
            if (!userId)
                return { success: false, error: 'Unauthorized' };
            await this.chatService.markMessageAsRead(data.chatId, userId, data.messageId, data.page);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Error marking message as read: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
    handleChatCreated(payload) {
        for (const userId of payload.userIds) {
            this.server.to(userId).emit('newChat', { chat: payload.chat });
        }
        this.logger.log(`Emitted newChat event to users: ${payload.userIds.join(', ')}`);
    }
    async handleMessageCreated(payload) {
        try {
            const socketsInRoom = this.server.in(payload.chatId).allSockets();
            this.logger.log(`Room ${payload.chatId} has ${socketsInRoom ? (await socketsInRoom).size : 0} connected clients`);
            this.logger.log(`Emitting newMessage to chat room: ${payload.chatId}, message ID: ${payload.message.id}`);
            this.server.to(payload.chatId).emit('newMessage', {
                chatId: payload.chatId,
                message: payload.message
            });
            for (const userId of payload.userIds) {
                this.logger.log(`Emitting chatUpdated to user: ${userId}`);
                this.server.to(userId).emit('chatUpdated', {
                    chatId: payload.chatId,
                    lastMessage: payload.message
                });
                this.server.to(userId).emit('newMessage', {
                    chatId: payload.chatId,
                    message: payload.message
                });
            }
            this.logger.log(`Successfully emitted newMessage event to chat: ${payload.chatId}`);
        }
        catch (error) {
            this.logger.error(`Error emitting message events: ${error.message}`);
        }
    }
    handleMessageRead(payload) {
        this.server.to(payload.chatId).emit('messageRead', payload);
        this.logger.log(`Emitted messageRead event to chat: ${payload.chatId}`);
    }
    handleJoinUserRoom(client, data) {
        try {
            const socketUserId = client.data.userId;
            if (socketUserId !== data.userId) {
                this.logger.error(`User ${socketUserId} attempted to join another user's room: ${data.userId}`);
                return { success: false, error: 'Unauthorized' };
            }
            client.join(data.userId);
            this.logger.log(`Client ${client.id} joined user room: ${data.userId}`);
            return { success: true };
        }
        catch (error) {
            this.logger.error(`Error joining user room: ${error.message}`);
            return { success: false, error: error.message };
        }
    }
};
exports.ChatGateway = ChatGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], ChatGateway.prototype, "server", void 0);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinChat'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleJoinChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('leaveChat'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleLeaveChat", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('sendMessage'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleSendMessage", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('markMessageRead'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMarkMessageRead", null);
__decorate([
    (0, event_emitter_1.OnEvent)('chat.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleChatCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('message.created'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChatGateway.prototype, "handleMessageCreated", null);
__decorate([
    (0, event_emitter_1.OnEvent)('message.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleMessageRead", null);
__decorate([
    (0, websockets_1.SubscribeMessage)('joinUserRoom'),
    __param(0, (0, websockets_1.ConnectedSocket)()),
    __param(1, (0, websockets_1.MessageBody)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [socket_io_1.Socket, Object]),
    __metadata("design:returntype", void 0)
], ChatGateway.prototype, "handleJoinUserRoom", null);
exports.ChatGateway = ChatGateway = ChatGateway_1 = __decorate([
    (0, websockets_1.WebSocketGateway)({
        namespace: 'chat',
        cors: {
            origin: '*',
        },
    }),
    __metadata("design:paramtypes", [chat_service_1.ChatService])
], ChatGateway);
//# sourceMappingURL=chat.gateway.js.map