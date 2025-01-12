import { BadRequestException, Injectable } from '@nestjs/common'
import { PostModel, User } from 'prisma/__generated__'
import { userSelect } from 'src/config/constants/user.constants'
import {
  CreatePostDto,
  EditPostDto,
  UpsertDraftDto,
} from '../dtos/post.dto'
import { PrismaService } from '../prisma/prisma.service'

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

  createPost(data: CreatePostDto & User) {
    return this.prisma.postModel.create({
      data: {
        content: data.content,
        User: {
          connect: {
            id: data.id,
            username: data.username,
          },
        },
      },
      include: {
        User: {
          select: {
            ...userSelect,
          },
        },
        Like: true,
        Comment: true,
      }
    });
  }

  async likePost(postId: number, userId: string ) {
    const post = await this.prisma.postModel.findUnique({
      where: {
        id: postId
      },
      include: {
        Like: true
      }
    })

    if (!post) {
      throw new BadRequestException('Post not found');
    }

    const isLiked = post.Like.some(like => like.userId === userId)

    const updatedPost = await this.prisma.postModel.update({
      where: {
        id: postId,
      },
      data: {
        Like: isLiked ? {
          delete: {
            userId_postId: {
              userId,
              postId
            }
          }
        } : {
          create: {
            user: {
              connect: {
                id: userId
              }
            }
          }
        }
        },
      include: {
        Like: true,
      },
    });

    return {
      ...updatedPost,
      likes: updatedPost.Like.length,
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

  async delete(postId: number, userId: string ) {
    if (!postId) throw new BadRequestException('Id not found');

    const post = await this.prisma.postModel.findUnique({
      where: {
        id: postId,
      },
    });

    if (post.userId !== userId)
      throw new BadRequestException("You can't update someones else's post!");

    return await this.prisma.postModel.delete({
      where: {
        id: postId,
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

    if (post.userId !== data.UserDtoId)
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

  // ==================== DRAFTS ====================

  async upsertDraft(userId: string, data: UpsertDraftDto) {
    const postDraft = await this.prisma.postDraft.findUnique({
      where: {
        userId,
      },
      include: {
        media: true,
      }
    });

    return await this.prisma.postDraft.upsert({
      where: {
        userId,
      },
      create: {
        userId,
        content: data.content || '',
        media: {
          create: data?.media?.map((asset) => {
            return {
              key: asset.key,
              url: asset.url,
            };
          }),
        },
      },
      update: {
        content: data.content,
        media: {
          upsert: data?.media?.map(asset => {
            return {
              where: {
                key: asset.key
              },
              create: {
                key: asset.key,
                url: asset.url
              },
              update: {
                key: asset.key,
                url: asset.url
              }
            }
          })
        },
      },
    });
  }

  async deleteMediaDraft(userId: string, key: string) {
    return await this.prisma.postDraft.update({
      where: {
        userId,
      },
      data: {
        media: {
          delete: {
            key
          }
        }
      }
    })
  }

  async getDraft(userId: string) {
    return await this.prisma.postDraft.findUnique({
      where: {
        userId,
      },
      include: {
        media: true,
      },
    });
  }
}
