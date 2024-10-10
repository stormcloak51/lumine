import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from 'src/auth/auth.guard';
import { PostModel } from '@prisma/client';
import { CreatePostDto } from './post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Post('create')
  createPost(
    @Body()
    data: CreatePostDto,
  ) {
    // const { content } = data;
    return this.postService.createPost(data);
  }

  @UseGuards(AuthGuard)
  @Get()
  findByUsername(@Query('username') username: string): Promise<PostModel[]> {
    return this.postService.findByUsername(username);
  }
}
