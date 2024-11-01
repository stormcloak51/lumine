import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, Req, Request as RequestNest, UseGuards } from '@nestjs/common';
import { PostModel } from '@prisma/client';
import { CreatePostDto, EditPostDto, LikePostDto } from '../dtos/post.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { Request } from 'express'
import * as cookie from 'cookie'

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('sortedByLikes')
  findAllSortedByLikes(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.postService.findAllSortedByLikes(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('sortedByDate')
  findAllSortedByDate(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.postService.findAllSortedByDate(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createPost(
    @Body()
    data: CreatePostDto,
    @RequestNest() req: Request
  ) {
    const refreshToken = req.cookies['refresh_token'];
    const accessToken = req.cookies['access_token'];
    
    return this.postService.createPost(data);
  }


  @UseGuards(JwtAuthGuard)
  @Get('findById')
  findById(@Query('id', ParseIntPipe) id: number) {
    return this.postService.findById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get('findByUsername')
  findByUsername(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('username') username: string){
    
    return this.postService.findAllByUsername(page, limit, username);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('like')
  likePost(
    @Body()
    data: LikePostDto,
  ) {
    return this.postService.likePost(data);
  }


  @UseGuards(JwtAuthGuard)
  @Patch('unlike')
  unlikePost(
    @Body()
    data: LikePostDto,
  ) {
    return this.postService.unLikePost(data);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('delete')
  delete(@Query('id', ParseIntPipe) id: number) {
    return this.postService.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit')
  edit(@Body() data: EditPostDto){
    return this.postService.edit(data.postId, data.content)
  }
}
