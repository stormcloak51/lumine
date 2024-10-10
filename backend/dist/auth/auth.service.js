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
const user_service_1 = require("../user/user.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const prisma_service_1 = require("../prisma.service");
let AuthService = class AuthService {
    constructor(userService, jwtService, prisma) {
        this.userService = userService;
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async signIn(usernameOrEmail, pass) {
        const user = await this.userService.findOne(usernameOrEmail);
        await bcrypt.hash(pass, 10);
        if (user && !(await bcrypt.compare(pass, user.password))) {
            throw new common_1.UnauthorizedException();
        }
        const payload = { sub: user.id, username: user.username };
        return {
            user,
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    async signUp(user) {
        const hashedPass = await bcrypt.hash(user.password, 10);
        const { password, ...rest } = user;
        const selectProps = Object.fromEntries(Object.keys(rest).map(key => [key, true]));
        selectProps.password = false;
        await this.prisma.user.create({
            data: {
                id: user.id,
                name: user.name,
                surname: user.surname,
                bio: '',
                email: user.email,
                password: hashedPass,
                username: user.username,
                userAvatar: user.userAvatar,
                role: 'USER',
                access_token: '',
            },
            select: selectProps
        });
        const payload = { sub: user.id, username: user.username };
        return {
            user: {
                ...rest,
                bio: '',
                role: 'USER',
            },
            access_token: await this.jwtService.signAsync(payload),
        };
    }
    isAuthenticated() {
        return true;
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