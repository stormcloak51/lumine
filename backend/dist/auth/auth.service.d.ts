import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private userService;
    private jwtService;
    private prisma;
    constructor(userService: UserService, jwtService: JwtService, prisma: PrismaService);
    signIn(usernameOrEmail: string, pass: string): Promise<{
        user: User;
        access_token: string;
    }>;
    signUp(user: Partial<User>): Promise<{
        user: {
            bio: string;
            role: string;
            name?: string;
            id?: string;
            username?: string;
            email?: string;
            surname?: string;
            userAvatar?: string;
            created_at?: Date;
            updated_at?: Date;
        };
        access_token: string;
    }>;
    isAuthenticated(): boolean;
}
