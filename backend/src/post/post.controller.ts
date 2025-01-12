import { Body, Controller, Delete, Get, ParseIntPipe, Patch, Post, Query, Req, Request as RequestNest, UseGuards } from '@nestjs/common';
import { PostModel, User } from 'prisma/__generated__';
import { UpsertDraftDto, CreatePostDto, EditPostDto } from '../dtos/post.dto';
import { PostService } from './post.service';
import { CurrentUser } from 'src/auth/decorators/user.decorator'
import { Authorization } from 'src/auth/decorators/auth.decorator'

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Authorization()
  @Get()
  findAll() {
    return this.postService.findAll();
  }


  @Authorization()
  @Get('sortedByLikes')
  findAllSortedByLikes(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.postService.findAllSortedByLikes(page, limit);
  }

  @Authorization()
  @Get('sortedByDate')
  findAllSortedByDate(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.postService.findAllSortedByDate(page, limit);
  }


  @Authorization()
  @Post('create')
  createPost(
    @Body()
    data: CreatePostDto,
    @CurrentUser() user: User,
  ) {
    return this.postService.createPost({ ...data, ...user });
  }


  @Authorization()
  @Get('findById')
  findById(@Query('id', ParseIntPipe) id: number) {
    return this.postService.findById(id);
  }


  @Authorization()
  @Get('findByUsername')
  findByUsername(@Query('page') page: number = 1, @Query('limit') limit: number = 10, @Query('username') username: string){
    
    return this.postService.findAllByUsername(page, limit, username);
  }

  @Authorization()
  @Patch('like')
  likePost(
    @Body('postId', ParseIntPipe) postId: number,
    @CurrentUser('id') userId: string,
  ) {
    return this.postService.likePost(postId, userId);
  }

  @Authorization()
  @Delete('delete')
  delete(@Body() postId: number, @CurrentUser('id') userId: string) {
    return this.postService.delete(postId, userId);
  }

  @Authorization()
  @Patch('edit')
  edit(@Body() data: EditPostDto){
    return this.postService.edit(data)
  }

  // ==================== DRAFTS ====================


  @Authorization()
  @Get('getDraft')
  getDraft(@CurrentUser() user: User) {
    return this.postService.getDraft(user.id)
  }


  @Authorization()
  @Post('upsertDraft')
  upsertDraft(@Body() data: UpsertDraftDto, @CurrentUser() user: User){
    return this.postService.upsertDraft(user.id, data)
  }


  @Authorization()
  @Delete('deleteMediaDraft')
  deleteMediaDraft(@Body('key') key: string, @CurrentUser() user: User){
    return this.postService.deleteMediaDraft(user.id, key)
  }

}
