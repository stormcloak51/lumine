import { Module } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { CommentController } from './comment.controller'
import { CommentService } from './comment.service'
import { UserService } from '../user/user.service'

@Module({
  controllers: [CommentController],
  providers: [CommentService, PrismaService, UserService],
})
export class CommentModule {}
