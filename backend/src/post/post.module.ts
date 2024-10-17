import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { PrismaService } from 'src/prisma.service'
import { PostsGateway } from './post.gateway'

@Module({
  controllers: [PostController],
  providers: [PostService, PrismaService, PostsGateway],
})
export class PostModule {}
