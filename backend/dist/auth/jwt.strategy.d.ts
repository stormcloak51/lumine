import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';
declare const JwtStrategy_base: new (...args: any[]) => any;
export declare class JwtStrategy extends JwtStrategy_base {
    private configService;
    private userService;
    constructor(configService: ConfigService, userService: UserService);
    validate({ id }: {
        id: string;
    }): Promise<{
        username: string;
        email: string;
        userAvatar: string;
        name: string;
        surname: string;
        id: string;
        userCover: string;
        bio: string;
        created_at: Date;
        updated_at: Date;
        password: string;
        role: string;
    }>;
}
export {};
