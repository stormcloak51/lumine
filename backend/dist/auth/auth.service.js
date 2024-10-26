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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma.service");
const user_service_1 = require("../user/user.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, prisma) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.prisma = prisma;
        this.EXPIRE_DAY_REFRESH_TOKEN = 1;
        this.REFRESH_TOKEN_NAME = 'refresh_token';
    }
    async login(dto) {
        const { password, ...user } = await this.validateUser(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    async register(dto) {
        const oldUser = await this.userService.findOne(dto.email);
        if (oldUser)
            throw new common_1.BadRequestException('User already exists');
        const { password, ...user } = await this.userService.create(dto);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens,
        };
    }
    async getNewTokens(refreshToken) {
        const result = await this.jwtService.verifyAsync(refreshToken);
        if (!result)
            throw new common_1.UnauthorizedException('Invalid refresh token');
        const user = await this.userService.findOne(result.id);
        const tokens = this.issueTokens(user.id);
        return {
            user,
            ...tokens
        };
    }
    issueTokens(userId) {
        const data = { id: userId };
        const accessToken = this.jwtService.sign(data, {
            expiresIn: '1h',
        });
        const refreshToken = this.jwtService.sign(data, {
            expiresIn: '7d',
        });
        return { accessToken, refreshToken };
    }
    async validateUser(dto) {
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        id: dto.usernameOrEmail,
                    },
                    {
                        email: dto.usernameOrEmail,
                    },
                    {
                        username: dto.usernameOrEmail,
                    },
                ],
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const isValid = await bcrypt.compare(dto.password, user.password);
        if (!isValid)
            throw new common_1.UnauthorizedException('Invalid password');
        return user;
    }
    addRefreshTokenToResponse(res, refreshToken) {
        const expiresIn = new Date();
        expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);
        res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
            httpOnly: true,
            domain: 'localhost',
            expires: expiresIn,
        });
    }
    removeRefreshTokenFromResponse(res) {
        res.cookie(this.REFRESH_TOKEN_NAME, '', {
            httpOnly: true,
            domain: 'localhost',
            expires: new Date(0),
            secure: true,
            sameSite: 'none',
        });
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_service_1.UserService,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map