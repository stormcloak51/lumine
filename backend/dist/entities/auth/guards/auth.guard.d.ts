import { CanActivate, ExecutionContext } from '@nestjs/common';
import { UserService } from 'src/entities/user/user.service';
export declare class AuthGuard implements CanActivate {
    private readonly userService;
    constructor(userService: UserService);
    canActivate(context: ExecutionContext): Promise<boolean>;
}
