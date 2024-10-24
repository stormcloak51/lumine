import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client';
import { CreatePostDto, LikePostDto } from '../dtos/post.dto';
import { PrismaService } from '../prisma.service';

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
            userAvatar: true,
          },
        },
      },
    });
  }

  findAllSortedByLikes() {
    return this.prisma.postModel.findMany({
      orderBy: {
        likes: 'desc',
      },
      include: {
        User: {
          select: {
            name: true,
            surname: true,
            username: true,
            bio: true,
            userAvatar: true,
          }
        }
      }
    })
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
      include: {
        User: {
          select: {
            name: true,
            surname: true,
            username: true,
            bio: true,
            userAvatar: true,
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
        likes: {
          increment: 1,
        },
        UserLike: {
          create: {
            user: {
              connect: {
                id: data.user.id,
                username: data.user.username,
              },
            },
          },
        }
      },
    });
  }

  unLikePost(data: LikePostDto) {
    return this.prisma.postModel.update({
      where: {
        id: data.postId,
      },
      data: {
        likes: {
          decrement: 1,
        },
        UserLike: {
          delete: {
            userId_postId: {
              userId: data.user.id,
              postId: data.postId,
            }
          },
        }
      },
    });
  }

  findByUsername(username: string) {
    return this.prisma.postModel.findMany({
      where: {
        User: {
          username: username,
        },
      },
      include: {
        User: {
          select: {
            name: true,
            surname: true,
            username: true,
            bio: true,
            userAvatar: true,
          },
        },
      },
    });
  }
}
