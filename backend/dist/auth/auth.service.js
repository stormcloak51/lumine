"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("../user/user.service");
const user_dto_1 = require("../dtos/user.dto");
const class_transformer_1 = require("class-transformer");
const argon = __importStar(require("argon2"));
const config_1 = require("@nestjs/config");
let AuthService = class AuthService {
    constructor(userService, configService) {
        this.userService = userService;
        this.configService = configService;
    }
    async register(req, dto) {
        const isExists = await this.userService.findOne(dto.email);
        if (isExists) {
            throw new common_1.ConflictException('User with this email already exists');
        }
        const newUser = await this.userService.create(dto);
        return this.saveSession(req, newUser);
    }
    async login(req, dto) {
        const user = await this.userService.findOne(dto.usernameOrEmail);
        if (!user) {
            throw new common_1.NotFoundException('User with such credentials does not exist');
        }
        const isValidPass = await argon.verify(user.password, dto.password);
        if (!isValidPass) {
            throw new common_1.UnauthorizedException('Password is incorrect, please try again');
        }
        return this.saveSession(req, user);
    }
    async logout(req, res) {
        return new Promise((resolve, reject) => {
            req.session.destroy(err => {
                if (err) {
                    return reject(new common_1.InternalServerErrorException('Failed to destroy session. Session is already destroyed or try again later'));
                }
                res.clearCookie(this.configService.getOrThrow('SESSION_NAME'));
                resolve();
            });
        });
    }
    async saveSession(req, user) {
        return new Promise((resolve, reject) => {
            req.session.userId = user.id;
            req.session.save(err => {
                if (err)
                    return reject(new common_1.InternalServerErrorException('Failed to save session. Please check parameters and try again'));
                const plainedUser = (0, class_transformer_1.plainToInstance)(user_dto_1.UserDto, user);
                resolve(plainedUser);
            });
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService, config_1.ConfigService])
], AuthService);
//# sourceMappingURL=auth.service.js.map