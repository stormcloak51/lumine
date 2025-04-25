import { UserDto } from '@/src/infrastructure/dtos/user.dto';
import { ConfigService } from '@nestjs/config';
import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    register(req: Request, dto: RegisterDto): Promise<UserDto>;
    login(req: Request, dto: LoginDto): Promise<UserDto>;
    logout(req: Request, res: Response): Promise<void>;
    private saveSession;
}
