import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, Req, Request as RequestNest, UseGuards } from '@nestjs/common';
import { PostModel, User } from '@prisma/client';
import { UpsertDraftDto, CreatePostDto, DeletePostDto, EditPostDto, LikePostDto } from '../dtos/post.dto';
import { PostService } from './post.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard'
import { Request } from 'express'
import * as cookie from 'cookie'
import { AuthGuard } from '@nestjs/passport'
import { CurrentUser } from 'src/auth/decorators/user.decorator'

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.postService.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Get('sortedByLikes')
  findAllSortedByLikes(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.postService.findAllSortedByLikes(page, limit);
  }

  // @UseGuards(JwtAuthGuard)
  @Get('sortedByDate')
  findAllSortedByDate(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.postService.findAllSortedByDate(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  createPost(
    @Body()
    data: CreatePostDto,
  ) {
    
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
  delete(@Body() data: DeletePostDto) {
    return this.postService.delete(data);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('edit')
  edit(@Body() data: EditPostDto){
    return this.postService.edit(data)
  }

  // ==================== DRAFTS ====================

  @UseGuards(JwtAuthGuard)
  @Get('getDraft')
  getDraft(@CurrentUser() user: User) {
    return this.postService.getDraft(user.id)
  }

  @UseGuards(JwtAuthGuard)
  @Post('upsertDraft')
  upsertDraft(@Body() data: UpsertDraftDto, @CurrentUser() user: User){
    return this.postService.upsertDraft(user.id, data)
  }

}
