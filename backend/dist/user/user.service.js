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
const __generated__1 = require("../../prisma/__generated__/index.js");
const argon2_1 = require("argon2");
const prisma_service_1 = require("../prisma/prisma.service");
let UserService = class UserService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        await this.checkUserExists(dto);
        const password = await (0, argon2_1.hash)(dto.password);
        const data = {
            ...dto,
            password,
            bio: '',
        };
        return await this.prisma.user.create({
            data,
        });
    }
    findOne(idOrEmailOrUsername) {
        const user = this.prisma.user.findFirst({
            where: {
                OR: [
                    {
                        id: idOrEmailOrUsername,
                    },
                    {
                        email: idOrEmailOrUsername,
                    },
                    {
                        username: idOrEmailOrUsername,
                    },
                ],
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async checkUserExists(dto) {
        const existingUser = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: dto.email },
                    { username: dto.username }
                ],
            }
        });
        if (existingUser) {
            throw new common_1.HttpException('User with this email or username already exists', common_1.HttpStatus.CONFLICT);
        }
        return existingUser;
    }
    findAll() {
        return this.prisma.user.findMany();
    }
    async update({ id, dto }) {
        try {
            const updatedUser = await this.prisma.user.update({
                where: {
                    id,
                },
                data: {
                    ...dto,
                },
            });
            return updatedUser;
        }
        catch (err) {
            if (err instanceof __generated__1.Prisma.PrismaClientKnownRequestError) {
                if (err.code === 'P2002') {
                    const errorMessage = err.message;
                    const conflictingField = errorMessage.match(/Unique constraint failed on the fields: \((.*)\)/)[1];
                    throw new common_1.HttpException(`User with this ${conflictingField} already exists`, common_1.HttpStatus.CONFLICT);
                }
            }
        }
    }
    delete(id) {
        return this.prisma.user.delete({
            where: {
                id,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserService);
//# sourceMappingURL=user.service.js.map