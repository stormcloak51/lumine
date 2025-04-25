"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const event_emitter_1 = require("@nestjs/event-emitter");
const auth_module_1 = require("./entities/auth/auth.module");
const chat_module_1 = require("./entities/chat/chat.module");
const comment_module_1 = require("./entities/comment/comment.module");
const friendship_module_1 = require("./entities/friendship/friendship.module");
const post_module_1 = require("./entities/post/post.module");
const post_service_1 = require("./entities/post/post.service");
const user_module_1 = require("./entities/user/user.module");
const ExcludePassword_interceptor_1 = require("./infrastructure/interceptors/ExcludePassword.interceptor");
const prisma_module_1 = require("./infrastructure/prisma/prisma.module");
const prisma_service_1 = require("./infrastructure/prisma/prisma.service");
const redis_module_1 = require("./infrastructure/redis/redis.module");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true
            }),
            event_emitter_1.EventEmitterModule.forRoot(),
            post_module_1.PostModule,
            user_module_1.UserModule,
            auth_module_1.AuthModule,
            comment_module_1.CommentModule,
            friendship_module_1.FriendshipModule,
            prisma_module_1.PrismaModule,
            redis_module_1.RedisModule,
            chat_module_1.ChatModule
        ],
        providers: [post_service_1.PostService, prisma_service_1.PrismaService, {
                provide: core_1.APP_INTERCEPTOR,
                useClass: ExcludePassword_interceptor_1.ExcludePasswordInterceptor
            }],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map