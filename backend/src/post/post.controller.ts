import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, Req, UseGuards } from '@nestjs/common';
import { PostModel } from '@prisma/client';
import { CreatePostDto, EditPostDto, LikePostDto } from '../dtos/post.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { Request } from 'express'

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  // @UseGuards(JwtAuthGuard)
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

  // @UseGuards(JwtAuthGuard)
  @Get('findByUsername')
  findByUsername(@Req() req: Request, @Query('username') username: string): Promise<PostModel[]> {
    console.log(req.headers);
    return this.postService.findAllByUsername(username);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('like')
  likePost(
    @Body()
    data: LikePostDto,
  ) {
    return this.postService.likePost(data);
  }


  // @UseGuards(JwtAuthGuard)
  @Patch('unlike')
  unlikePost(
    @Body()
    data: LikePostDto,
  ) {
    return this.postService.unLikePost(data);
  }

  // @UseGuards(JwtAuthGuard)
  @Delete('delete')
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }

  // @UseGuards(JwtAuthGuard)
  @Patch('edit')
  edit(@Body() data: EditPostDto){
    return this.postService.edit(data.postId, data.content)
  }
}
