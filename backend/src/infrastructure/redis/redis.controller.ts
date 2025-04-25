import { Controller, Get } from '@nestjs/common';
import { RedisService } from './redis.service';

@Controller('redis')
export class RedisController {
  constructor(private readonly redisService: RedisService) {}

  @Get('test-connection')
  async testConnection() {
    const isConnected = await this.redisService.testConnection();
    return { connected: isConnected };
  }
}
