import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { CommentModule } from './comment/comment.module'
import { PostModule } from './post/post.module'
import { PostService } from './post/post.service'
import { PrismaService } from './prisma/prisma.service'
import { UserModule } from './user/user.module'
import { PrismaModule } from './prisma/prisma.module';
import { APP_INTERCEPTOR } from '@nestjs/core'
import { ExcludePasswordInterceptor } from './interceptors/ExcludePassword.interceptor'
import { FriendshipModule } from './friendship/friendship.module'
import { AuthSocketMiddleware } from './middlewares/ws.middleware'
import { FriendshipGateway } from './friendship/friendship.gateway'

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true
  }), PostModule, UserModule, AuthModule, CommentModule, PrismaModule, FriendshipModule],
  providers: [ PostService, PrismaService, {
    provide: APP_INTERCEPTOR,
    useClass: ExcludePasswordInterceptor
  }, AuthSocketMiddleware],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthSocketMiddleware).forRoutes(FriendshipGateway);
  }
}
