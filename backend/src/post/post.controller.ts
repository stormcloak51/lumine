import { Body, Controller, Get, Patch, Post, Query } from '@nestjs/common';
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
    return this.postService.findAllByUsername(username);
  }

  @Patch('like')
  likePost(
    @Body()
    data: LikePostDto,
  ) {
    return this.postService.likePost(data);
  }
  @Patch('unlike')
  unlikePost(
    @Body()
    data: LikePostDto,
  ) {
    return this.postService.unLikePost(data);
  }
}
