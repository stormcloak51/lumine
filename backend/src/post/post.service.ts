import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CreatePostDto } from './post.dto';
import { User } from '@prisma/client'

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.postModel.findMany({
      include: {
        User: {
          select: {
            name: true,
            surname: true,
            username: true,
            bio: true,
            userAvatar: true
          }
        }
      }
    });
  }

  createPost(data: CreatePostDto) {
    return this.prisma.postModel.create({
      data: {
        content: data.content,
        User: {
          connect: { 
            id: data.User.id,
            username: data.User.username
          },
        }
      },
      include: {
        User: {
          select: {
            name: true,
            surname: true,
            username: true,
            bio: true,
            userAvatar: true
          }
        }
      }
    });
  }

  findByUsername(username: string) {
    return this.prisma.postModel.findMany({
      where: {
        User: {
          username: username
        }
      },
      include: {
        User: {
          select: {
            name: true,
            surname: true,
            username: true,
            bio: true,
            userAvatar: true
          }
        }
      }
    });
  }
}
