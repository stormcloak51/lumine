import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { PostModel } from '@prisma/client';
import { CreatePostDto, LikePostDto } from '../dtos/post.dto';
import { PostService } from './post.service';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @Get('sortedByLikes')
  findAllSortedByLikes() {
    return this.postService.findAllSortedByLikes();
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

  @Post('like')
  likePost(
    @Body()
    data: LikePostDto,
  ) {
    return this.postService.likePost(data);
  }
  @Post('unlike')
  unlikePost(
    @Body()
    data: LikePostDto,
  ) {
    return this.postService.unLikePost(data);
  }
}
