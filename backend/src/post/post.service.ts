import { BadRequestException, Injectable } from '@nestjs/common';
import { PostModel, User } from '@prisma/client';
import {
  CreatePostDto,
  DeletePostDto,
  EditPostDto,
  LikePostDto,
} from '../dtos/post.dto';
import { PrismaService } from '../prisma.service';
import { userSelect } from 'src/config/constants/user.constants';

@Injectable()
export class PostService {
  constructor(private readonly prisma: PrismaService) {}

  findAll() {
    return this.prisma.postModel.findMany();
  }

  async findAllSortedByLikes(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: PostModel[]; total: number }> {
    const skip = (page - 1) * limit;

    const posts = await this.prisma.postModel.findMany({
      orderBy: {
        Like: {
          _count: 'desc',
        },
      },
      include: {
        User: { select: userSelect },
        Like: {
          select: {
            userId: true,
            postId: true,
          },
        },
        Comment: {
          include: {
            user: true,
          },
        },
      },
      skip,
      take: Number(limit),
    });

    const total = await this.prisma.postModel.count();

    return {
      data: posts.map((post) => ({
        ...post,
        likes: post.Like.length,
      })),
      total,
    };
  }

  async findAllByUsername(
    page: number = 1,
    limit: number = 10,
    username: string,
  ) {
    const skip = (page - 1) * limit;

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
        User: {
          select: {
            ...userSelect,
            likedPosts: true,
          },
        },
        Like: true,
        Comment: true,
      },
      skip,
      take: Number(limit),
    });

    const total = await this.prisma.postModel.count({
      where: {
        User: {
          username: username,
        },
      },
    });

    return {
      data: posts.map((post) => ({
        ...post,
        likes: post.Like.length,
      })),
      total,
    };
  }

  async findAllSortedByDate(page: number = 1, limit: number = 10) {
    try {
      const skip = (page - 1) * limit;

      const posts = await this.prisma.postModel.findMany({
        orderBy: {
          created_at: 'desc',
        },
        include: {
          User: {
            select: {
              ...userSelect,
              likedPosts: true,
            },
          },
          Like: true,
          Comment: true,
        },
        skip,
        take: Number(limit),
      });

      const total = await this.prisma.postModel.count();
      return {
        data: posts.map((post) => ({
          ...post,
          likes: post.Like.length,
        })),
        total,
      };
    } catch (error) {
      console.error('Find posts error:', error);
      throw new Error('Failed to fetch posts');
    }
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

  async likePost(data: LikePostDto) {
    const post = await this.prisma.postModel.update({
      where: {
        id: data.postId,
      },
      data: {
        Like: {
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
      include: {
        Like: true,
      },
    });

    return {
      ...post,
      likes: post.Like.length,
    };
  }

  async unLikePost(data: LikePostDto) {
    const post = await this.prisma.postModel.update({
      where: {
        id: data.postId,
      },
      data: {
        Like: {
          delete: {
            userId_postId: {
              userId: data.user.id,
              postId: data.postId,
            },
          },
        },
      },
      include: {
        Like: true,
      },
    });

    return {
      ...post,
      likes: post.Like.length,
    };
  }

  async findById(id: number) {
    const post = await this.prisma.postModel.findUnique({
      where: {
        id,
      },
      include: {
        User: {
          select: {
            ...userSelect,
            likedPosts: true,
          },
        },
        Like: {
          select: {
            userId: true,
            postId: true,
          },
        },
        Comment: {
          include: {
            user: true,
          },
        },
      },
    });

    return {
      ...post,
      likes: post.Like.length,
    };
  }

  async delete(data: DeletePostDto) {
    if (!data.postId) throw new BadRequestException('Id not found');

    const post = await this.prisma.postModel.findUnique({
      where: {
        id: data.postId,
      },
    });

    if (post.userId !== data.userId)
      throw new BadRequestException("You can't update someones else's post!");

    return await this.prisma.postModel.delete({
      where: {
        id: data.postId,
      },
    });
  }
  async edit(data: EditPostDto) {
    if (!data.postId) throw new BadRequestException('Id not found');

    const post = await this.prisma.postModel.findUnique({
      where: {
        id: data.postId,
      },
    });

    if (post.userId !== data.userId)
      throw new BadRequestException("You can't update someones else's post!");

    return await this.prisma.postModel.update({
      where: {
        id: data.postId,
      },
      data: {
        content: data.content,
      },
    });
  }
}
