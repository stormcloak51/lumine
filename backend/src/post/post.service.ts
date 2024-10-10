import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './post.dto';
import { User } from '@prisma/client'

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.postModel.findMany();
  }

  createPost(data: CreatePostDto) {
    const postData = {
      content: data.content,
      userId: data.User.id,
    }
    return this.prisma.postModel.create({
      data: postData,
    });
  }

  findByUsername(user: User) {
    return this.prisma.postModel.findMany({
      where: {
        userId: user.id,
      },
    });
  }
}
