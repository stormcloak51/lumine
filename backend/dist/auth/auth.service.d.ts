import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'src/prisma.service';
import { User } from '@prisma/client';
export declare class AuthService {
    private userService;
    private jwtService;
    private prisma;
    constructor(userService: UserService, jwtService: JwtService, prisma: PrismaService);
    signIn(email: string, pass: string, isHashed: boolean): Promise<{
        access_token: string;
    }>;
    signUp(user: Partial<User>): Promise<{
        access_token: string;
    }>;
}
