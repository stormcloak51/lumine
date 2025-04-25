import { Request, Response } from 'express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(req: Request, dto: RegisterDto): Promise<import("../../infrastructure/dtos/user.dto").UserDto>;
    login(req: Request, dto: LoginDto): Promise<import("../../infrastructure/dtos/user.dto").UserDto>;
    logout(req: Request, res: Response): Promise<void>;
}
