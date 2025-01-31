"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FriendshipModule = void 0;
const common_1 = require("@nestjs/common");
const friendship_controller_1 = require("./friendship.controller");
const friendship_service_1 = require("./friendship.service");
const user_service_1 = require("../user/user.service");
const friendship_gateway_1 = require("./friendship.gateway");
let FriendshipModule = class FriendshipModule {
};
exports.FriendshipModule = FriendshipModule;
exports.FriendshipModule = FriendshipModule = __decorate([
    (0, common_1.Module)({
        controllers: [friendship_controller_1.FriendshipController],
        providers: [friendship_service_1.FriendshipService, user_service_1.UserService, friendship_gateway_1.FriendshipGateway],
        exports: [friendship_service_1.FriendshipService]
    })
], FriendshipModule);
//# sourceMappingURL=friendship.module.js.map