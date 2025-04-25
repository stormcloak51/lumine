import { PrismaModule } from '@/src/infrastructure/prisma/prisma.module'
import { RedisModule } from '@/src/infrastructure/redis/redis.module'
import { Module } from '@nestjs/common'
import { UserService } from '../user/user.service'
import { ChatController } from './chat.controller'
import { ChatGateway } from './chat.gateway'
import { ChatService } from './chat.service'

@Module({
  imports: [
    PrismaModule, 
    RedisModule
  ],
  controllers: [ChatController],
  providers: [ChatService, ChatGateway, UserService],
  exports: [ChatService]
})
export class ChatModule {}
