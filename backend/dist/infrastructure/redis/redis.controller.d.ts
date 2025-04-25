import { RedisService } from './redis.service';
export declare class RedisController {
    private readonly redisService;
    constructor(redisService: RedisService);
    testConnection(): Promise<{
        connected: boolean;
    }>;
}
