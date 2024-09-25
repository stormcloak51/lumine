import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { PrismaService } from './prisma.service';

@Module({
  imports: [ConfigModule.forRoot(), PostModule],
  controllers: [AppController],
  providers: [AppService, PostService, PrismaService],
})
export class AppModule {}
