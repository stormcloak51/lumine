import { AuthService } from './auth.service';
import { User } from '@prisma/client';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: Record<string, any>): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): any;
    signUp(user: Partial<User>): Promise<{
        access_token: string;
    }>;
    logout(response: Response): void;
}
