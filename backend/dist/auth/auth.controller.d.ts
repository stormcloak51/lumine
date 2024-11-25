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
            username: string;
            email: string;
            userAvatar: string;
            name: string;
            surname: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            bio: string;
            userCover: string;
            role: string;
        };
    }>;
    register(dto: RegisterDto, res: Response): Promise<{
        accessToken: string;
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
            userCover: string;
            role: string;
        };
    }>;
    getNewTokens(req: Request, res: Response): Promise<{
        accessToken: string;
        user: {
            username: string;
            email: string;
            userAvatar: string;
            name: string;
            surname: string;
            id: string;
            created_at: Date;
            updated_at: Date;
            password: string;
            bio: string;
            userCover: string;
            role: string;
        };
    }>;
    logout(res: Response): Promise<boolean>;
}
