import {
  Controller,
  Delete,
  Post,
  Body,
  ParseIntPipe,
  Patch,
  Query,
  Get,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import {
  CreateCommentDto,
  DeleteCommentDto,
  LikeCommentDto,
  EditCommentDto,
} from 'src/auth/dto/comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Get('getById')
  async get(
    @Query('postId', ParseIntPipe) postId: number,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.commentService.getById({ postId, page });
  }

  @Post('create')
  async create(
    @Body() dto: CreateCommentDto,
    @Body('postId', ParseIntPipe) postId: number,
  ) {
    return await this.commentService.create(dto, postId);
  }

  @Post('like')
  async like(@Body() dto: LikeCommentDto) {
    return this.commentService.likeComment(dto);
  }

  @Delete('delete')
  async delete(@Body() dto: DeleteCommentDto) {
    this.commentService.delete(dto);
  }

  @Patch('edit')
  async edit(@Body() dto: EditCommentDto) {
    this.commentService.edit(dto);
  }

  // = = = = = == = = = = = SUBCOMMENTS = = = = = == = = = = =

  @Get('getSubcomments')
  async getSubcomments(
    @Query('postId', ParseIntPipe) postId: number,
    @Query('commentId', ParseIntPipe) commentId: number,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.commentService.getSubcomments({
      postId,
      commentId,
      page,
    });
  }

  @Post('createSubcomment')
  async createSubcomment(
    @Body('postId', ParseIntPipe) postId: number,
    @Body('commentId', ParseIntPipe) commentId: number,
    @Body('userId') userId: string,
    @Body('content') content: string
  ) {
    const dto = { content, userId, commentId, postId };
    return await this.commentService.createSubcomment(dto);
  }
}
