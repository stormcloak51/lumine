import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';
export declare class AuthService {
    private userService;
    private jwtService;
    private prisma;
    EXPIRE_DAY_REFRESH_TOKEN: number;
    REFRESH_TOKEN_NAME: string;
    constructor(userService: UserService, jwtService: JwtService, prisma: PrismaService);
    login(dto: LoginDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            username: string;
            email: string;
            userAvatar: string;
            name: string;
            surname: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            bio: string;
            role: string;
        };
    }>;
    register(dto: RegisterDto): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            username: string;
            email: string;
            userAvatar: string;
            name: string;
            surname: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            bio: string;
            role: string;
        };
    }>;
    getNewTokens(refreshToken: string): Promise<{
        accessToken: string;
        refreshToken: string;
        user: {
            username: string;
            email: string;
            userAvatar: string;
            name: string;
            surname: string;
            id: string;
            created_at: Date;
            bio: string;
            role: string;
            likedPosts: {
                postId: number;
                userId: string;
            }[];
        };
    }>;
    private issueTokens;
    private validateUser;
    addRefreshTokenToResponse(res: Response, refreshToken: string): void;
    removeRefreshTokenFromResponse(res: Response): void;
}
