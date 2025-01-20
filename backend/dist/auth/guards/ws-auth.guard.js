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
exports.WsAuthGuard = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../../user/user.service");
const websockets_1 = require("@nestjs/websockets");
let WsAuthGuard = class WsAuthGuard {
    constructor(userService) {
        this.userService = userService;
    }
    async canActivate(context) {
        try {
            const client = context.switchToWs().getClient();
            const userId = client.handshake.;
            if (!userId) {
                throw new websockets_1.WsException('Unauthorized: No user ID provided');
            }
            const user = await this.userService.findOne(userId);
            if (!user) {
                throw new websockets_1.WsException('User not found');
            }
            client.user = user;
            return true;
        }
        catch (err) {
            throw new websockets_1.WsException('Unauthorized');
        }
    }
};
exports.WsAuthGuard = WsAuthGuard;
exports.WsAuthGuard = WsAuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService])
], WsAuthGuard);
//# sourceMappingURL=ws-auth.guard.js.map