import { Injectable } from '@nestjs/common';
import { PostModel, User } from '@prisma/client';
import { CreatePostDto, LikePostDto } from '../dtos/post.dto';
import { PrismaService } from '../prisma.service';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.postModel.findMany();
  }

  async findAllSortedByLikes(): Promise<PostModel[]> {
    const posts = await this.prisma.postModel.findMany({
      orderBy: {
        UserLike: {
          _count: 'desc',
        },
      },
      include: {
        User: true,
        UserLike: {
          select: {
            userId: true,
            postId: true,
          },
        },
      }
    });
    return posts.map((post) => ({
      ...post,
      likes: post.UserLike.length,
    }));
  }

  createPost(data: CreatePostDto) {
    return this.prisma.postModel.create({
      data: {
        content: data.content,
        User: {
          connect: {
            id: data.User.id,
            username: data.User.username,
          },
        },
      },
    });
  }

  likePost(data: LikePostDto) {
    return this.prisma.postModel.update({
      where: {
        id: data.postId,
      },
      data: {
        UserLike: {
          create: {
            user: {
              connect: {
                id: data.user.id,
                username: data.user.username,
              },
            },
          },
        },
      },
    });
  }

  unLikePost(data: LikePostDto) {
    return this.prisma.postModel.update({
      where: {
        id: data.postId,
      },
      data: {
        UserLike: {
          delete: {
            userId_postId: {
              userId: data.user.id,
              postId: data.postId,
            },
          },
        },
      },
    });
  }

  async findAllByUsername(username: string) {
    const posts = await this.prisma.postModel.findMany({
      where: {
        User: {
          username: username,
        },
      },
      orderBy: {
        created_at: 'desc',
      },
      include: {
        User: true,
        UserLike: true,
      },
    });

    return posts.map((post) => ({
      ...post,
      likes: post.UserLike.length,
    }));
  }
}
