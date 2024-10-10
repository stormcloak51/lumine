import { AuthService } from './auth.service';
import { User } from '@prisma/client';
import { SignInDto } from './dto/signIn.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signIn(signInDto: SignInDto): Promise<{
        user: User;
        access_token: string;
    }>;
    getProfile(req: any): any;
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
            access_token?: string;
        };
        access_token: string;
    }>;
    logout(response: Response): void;
    isAuthenticated(): boolean;
}
