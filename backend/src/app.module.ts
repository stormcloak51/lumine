import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { APP_INTERCEPTOR } from '@nestjs/core'
import { EventEmitterModule } from '@nestjs/event-emitter'
import { AuthModule } from './entities/auth/auth.module'
import { ChatModule } from './entities/chat/chat.module'
import { CommentModule } from './entities/comment/comment.module'
import { FriendshipModule } from './entities/friendship/friendship.module'
import { PostModule } from './entities/post/post.module'
import { PostService } from './entities/post/post.service'
import { UserModule } from './entities/user/user.module'
import { ExcludePasswordInterceptor } from './infrastructure/interceptors/ExcludePassword.interceptor'
import { PrismaModule } from './infrastructure/prisma/prisma.module'
import { PrismaService } from './infrastructure/prisma/prisma.service'
import { RedisModule } from './infrastructure/redis/redis.module'

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true
    }),
    EventEmitterModule.forRoot(),
    PostModule,
    UserModule,
    AuthModule,
    CommentModule,
    FriendshipModule,
    PrismaModule,
    RedisModule,
    ChatModule
  ],
  providers: [ PostService, PrismaService, {
    provide: APP_INTERCEPTOR,
    useClass: ExcludePasswordInterceptor
  }],
})
export class AppModule {}
