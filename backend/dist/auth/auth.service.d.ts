import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private jwtService;
    private prisma;
    constructor(jwtService: JwtService, prisma: PrismaService);
    signIn(usernameOrEmail: string, pass: string): Promise<{
        user: User;
        access_token: string;
    }>;
    signUp(user: Partial<User>): Promise<{
        user: {
            bio: string;
            role: string;
            username?: string;
            email?: string;
            userAvatar?: string;
            name?: string;
            surname?: string;
            id?: string;
            created_at?: Date;
            updated_at?: Date;
            access_token?: string;
        };
        access_token: string;
    }>;
    isAuthenticated(): boolean;
}
