import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { CommentModule } from './comment/comment.module';
import { MediaModule } from './media/media.module';

@Module({
  imports: [ConfigModule.forRoot(), PostModule, UserModule, AuthModule, CommentModule, MediaModule],
  providers: [ PostService, PrismaService],
})
export class AppModule {}
