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
import { CurrentUser } from '../auth/decorators/user.decorator'
import { Authorization } from '../auth/decorators/auth.decorator'

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Authorization()
  @Get('getById')
  async get(
    @Query('postId', ParseIntPipe) postId: number,
    @Query('page', ParseIntPipe) page: number = 1,
  ) {
    return await this.commentService.getById({ postId, page });
  }

  @Authorization()
  @Post('create')
  async create(
    @Body() dto: CreateCommentDto,
    @CurrentUser('id') userId: string,
  ) {
    return await this.commentService.create(dto, userId);
  }

  @Authorization()
  @Post('like')
  async like(@Body() dto: LikeCommentDto, @CurrentUser('id') userId: string) {
    return this.commentService.likeComment(dto, userId);
  }

  @Authorization()
  @Delete('delete')
  async delete(@Body() dto: DeleteCommentDto) {
    this.commentService.delete(dto);
  }

  @Authorization()
  @Patch('edit')
  async edit(@Body() dto: EditCommentDto) {
    this.commentService.edit(dto);
  }

  // = = = = = == = = = = = SUBCOMMENTS = = = = = == = = = = =

  @Authorization()
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

  @Authorization()
  @Post('createSubcomment')
  async createSubcomment(
    @Body('postId', ParseIntPipe) postId: number,
    @Body('commentId', ParseIntPipe) commentId: number,
    @Body('content') content: string,
    @CurrentUser('id') userId: string,
  ) {
    const dto = { content, userId, commentId, postId };
    return await this.commentService.createSubcomment(postId, commentId, userId,  content);
  }
}
