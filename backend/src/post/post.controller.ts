import { Body, Controller, Get, Post } from '@nestjs/common';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  // @Post('create')
  // createPost(@Body() data: {content: string}) {
  //   const {content} = data
  //   return this.postService.createPost(content)
  // }
}
