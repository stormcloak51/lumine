import { Request, Response } from 'express';
import { UserService } from '../user/user.service';
import { RegisterDto } from './dto/register.dto';
import { UserDto } from 'src/dtos/user.dto';
import { LoginDto } from './dto/login.dto';
import { ConfigService } from '@nestjs/config';
export declare class AuthService {
    private readonly userService;
    private readonly configService;
    constructor(userService: UserService, configService: ConfigService);
    register(req: Request, dto: RegisterDto): Promise<UserDto>;
    login(req: Request, dto: LoginDto): Promise<UserDto>;
    logout(req: Request, res: Response): Promise<void>;
    private saveSession;
}
