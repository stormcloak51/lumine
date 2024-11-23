import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(dto: LoginDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            username: string;
            email: string;
            name: string;
            surname: string;
            bio: string;
            userAvatar: string;
            userCover: string;
            created_at: Date;
            updated_at: Date;
            role: string;
        };
    }>;
    register(dto: RegisterDto, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            username: string;
            email: string;
            name: string;
            surname: string;
            bio: string;
            userAvatar: string;
            userCover: string;
            created_at: Date;
            updated_at: Date;
            role: string;
        };
    }>;
    getNewTokens(req: Request, res: Response): Promise<{
        accessToken: string;
        user: {
            id: string;
            username: string;
            email: string;
            password: string;
            name: string;
            surname: string;
            bio: string;
            userAvatar: string;
            userCover: string;
            created_at: Date;
            updated_at: Date;
            role: string;
        };
    }>;
    logout(res: Response): Promise<boolean>;
}
