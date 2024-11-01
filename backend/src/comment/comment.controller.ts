import { Controller, Delete, Post, Body, ParseIntPipe, Patch, Query, Get } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto, DeleteCommentDto, LikeCommentDto, EditCommentDto } from 'src/auth/dto/comment.dto'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('getById')
  async get(@Query('postId', ParseIntPipe) postId: number, @Query('page', ParseIntPipe) page: number = 1) {
    return await this.commentService.getById({postId, page})
  }

  @Post('create')
  async create(@Body() dto: CreateCommentDto, @Body('postId', ParseIntPipe) postId: number) {
    return await this.commentService.create(dto, postId);
  }

  @Post('like')
  async like(@Body() dto: LikeCommentDto) {
    return this.commentService.likeComment(dto)
  }

  @Delete('delete')
  async delete(@Body() dto: DeleteCommentDto) {
    this.commentService.delete(dto)
  }

  @Patch('edit')
  async edit(@Body() dto: EditCommentDto) {
    this.commentService.edit(dto)
  }
}
