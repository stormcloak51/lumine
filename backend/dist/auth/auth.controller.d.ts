import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Request, Response } from 'express';
import { UserDto } from 'src/dtos/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(req: Request, dto: RegisterDto): Promise<UserDto>;
    login(req: Request, dto: LoginDto): Promise<UserDto>;
    logout(req: Request, res: Response): Promise<void>;
}
