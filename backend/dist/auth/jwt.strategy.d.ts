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
        id: string;
        created_at: Date;
        name: string;
        username: string;
        email: string;
        surname: string;
        bio: string;
        userAvatar: string;
        role: string;
        likedPosts: {
            userId: string;
            postId: number;
        }[];
    }>;
}
export {};
