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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt_1 = require("bcrypt");
const prisma_service_1 = require("../prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(user) {
        const hashedPass = await (0, bcrypt_1.hash)(user.password, 10);
        const { password, ...select } = user;
        return this.prisma.user.create({
            data: {
                email: user.email,
                password: hashedPass,
                username: user.username,
                role: 'USER'
            },
            select: {
                id: true,
                username: true,
                email: true,
                updated_at: true,
                created_at: true,
                role: true,
            }
        });
    }
    findOne(idOrEmailOrUsername) {
        return this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        id: idOrEmailOrUsername
                    },
                    {
                        email: idOrEmailOrUsername
                    },
                    {
                        username: idOrEmailOrUsername
                    }
                ]
            }
        });
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    delete(id) {
        return this.prisma.user.delete({
            where: {
                id
            }
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map