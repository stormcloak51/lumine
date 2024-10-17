import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { PostService } from './post.service';
import { PostModel } from '@prisma/client';
import { CreatePostDto } from './post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }
  // @UseGuards(JwtAuthGuard)
  @Post('create')
  createPost(
    @Body()
    data: CreatePostDto,
  ) {
    return this.postService.createPost(data);
  }
  
  @Get('findByUsername')
  findByUsername(@Query('username') username: string): Promise<PostModel[]> {
    return this.postService.findByUsername(username);
  }
}
