import { CacheModule } from '@nestjs/cache-manager'
import { Module } from '@nestjs/common'
import { RedisOptions } from '../config/redis.config'
import { RedisController } from './redis.controller'
import { RedisService } from './redis.service'

@Module({
  imports: [CacheModule.registerAsync(RedisOptions)],
  controllers: [RedisController],
  providers: [RedisService],
  exports: [RedisService]
})
export class RedisModule {}
