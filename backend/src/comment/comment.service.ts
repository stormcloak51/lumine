import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateCommentDto, DeleteCommentDto, LikeCommentDto, EditCommentDto, GetCommentsDto } from 'src/auth/dto/comment.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(dto: GetCommentsDto){
		const comments = await this.prisma.comment.findMany({
			where: {
				postId: dto.postId
			},
			orderBy: {
				created_at: 'desc'
			},
			include: {
				user: {
					select: {
						id: true,
						likedComments: true,
						username: true,
						userAvatar: true,
						name: true,
					}
				},
				Like: true
			},
			skip: (dto.page - 1) * 5,
			take: 5
		})

		const total = await this.prisma.comment.count({
			where: {
				postId: dto.postId
			}
		})

		return {
			data: comments.map((comment) => ({
				...comment,
				likes: comment.Like.length
			})),
			total,
		}
	}

	async create(dto: CreateCommentDto, postId: number) {
		return await this.prisma.comment.create({
			data: {
				post: {
					connect: {
						id: postId
					}
				},
				user: {
					connect: {
						id: dto.userId
					}
				},
				content: dto.content
			},
			include: {
				user: {
					select: {
						id: true,
						likedComments: true,
						username: true,
						userAvatar: true,
						name: true,
					}
				},
				Like: true,
			}
		})
	}

	async likeComment(dto: LikeCommentDto) {

		const comment = await this.prisma.comment.findUnique({
			where: {
				id: dto.commentId,
			},
			include: {
				Like: true
			}
		})

		if (!comment) {
			throw new BadRequestException('Comment not found')
		}

		// Проверяем существующий лайк
		const existingLike = await this.prisma.$transaction(async (prisma) => {
			const like = await prisma.commentLike.findFirst({
				where: {
					AND: [
						{ userId: dto.userId },
						{ commentId: dto.commentId }
					]
				}
			})

			if (like) {
				// Если лайк существует - удаляем его
				await prisma.commentLike.deleteMany({
					where: {
						AND: [
							{ userId: dto.userId },
							{ commentId: dto.commentId }
						]
					}
				})
				return like
			} else {
				// Если лайка нет - создаем новый
				return await prisma.commentLike.create({
					data: {
						userId: dto.userId,
						commentId: dto.commentId
					}
				})
			}
		})

		// Получаем обновленный комментарий
		const updatedComment = await this.prisma.comment.findUnique({
			where: {
				id: dto.commentId,
			},
			include: {
				user: {
					select: {
						id: true,
						likedComments: true,
						username: true,
						userAvatar: true,
						name: true,
					}
				},
				Like: {
					include: {
						user: {
							select: {
								id: true
							}
						}
					}
				}
			}
		})

		if (!updatedComment) {
			throw new BadRequestException('Failed to update comment')
		}

		return {
			...updatedComment,
			likes: updatedComment.Like.length
		}

	}

	async delete(dto: DeleteCommentDto) {
		return await this.prisma.comment.delete({
			where: {
				id: dto.commentId,
				postId: dto.postId,
			}
		})
	}	

	edit(dto: EditCommentDto) {
		const comment = this.prisma.comment.findUnique({
			where: {
				id: dto.commentId,
				postId: dto.postId
			}
		})

		if (!comment) {
			throw new Error('Comment not found')
		}

		return this.prisma.comment.update({
			where: {
				id: dto.commentId,
				postId: dto.postId,
			},
			data: {
				content: dto.content
			}
		})
	}
}
