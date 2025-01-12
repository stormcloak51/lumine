import { BadRequestException, Injectable } from '@nestjs/common'
import { CreateCommentDto, DeleteCommentDto, EditCommentDto, GetCommentsDto, LikeCommentDto } from 'src/auth/dto/comment.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { userSelect } from '../config/constants/user.constants'

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(dto: GetCommentsDto){
		const comments = await this.prisma.comment.findMany({
			where: {
				postId: dto.postId,
				parentId: null
			},
			orderBy: {
				created_at: 'desc'
			},
			include: {
				user: {
					select: {
						...userSelect,
						likedPosts: true,
					},
				},
				Like: true,
				subComments: {
					select: {
						Like: true,
					}
				}
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

	async create(dto: CreateCommentDto, userId: string) {
		const comment = await this.prisma.comment.create({
			data: {
				post: {
					connect: {
						id: dto.postId
					}
				},
				user: {
					connect: {
						id: userId
					}
				},
				content: dto.content
			},
			include: {
				user: {
					select: {
						...userSelect,
						likedPosts: true,
					},
				},
				Like: true,
			}
		})

		return {
			...comment,
			likes: comment.Like.length
		}
	}

	async likeComment(dto: LikeCommentDto, userId: string) {

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

		const existingLike = await this.prisma.$transaction(async (prisma) => {
			const like = await prisma.commentLike.findFirst({
				where: {
					AND: [
						{ userId: userId },
						{ commentId: dto.commentId }
					]
				}
			})

			if (like) {
				await prisma.commentLike.deleteMany({
					where: {
						AND: [
							{ userId: userId },
							{ commentId: dto.commentId }
						]
					}
				})
				return like
			} else {
				return await prisma.commentLike.create({
					data: {
						userId: userId,
						commentId: dto.commentId
					}
				})
			}
		})

		const updatedComment = await this.prisma.comment.findUnique({
			where: {
				id: dto.commentId,
			},
			include: {
				user: {
					select: {
						...userSelect,
						likedComments: true,
					},
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


	async getSubcomments(dto: GetCommentsDto){
		const comments = await this.prisma.comment.findMany({
			where: {
				postId: dto.postId,
				parentId: dto.commentId
			},
			orderBy: {
				created_at: 'desc'
			},
			include: {
				user: {
					select: {
						...userSelect,
						likedComments: true,
					},
				},
				Like: true
			},
			skip: (dto.page - 1) * 5,
			take: 5
		})

		const total = await this.prisma.comment.count({
			where: {
				postId: dto.postId,
				parentId: dto.commentId
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
	
	async createSubcomment(postId: number, commentId: number, userId: string, content: string){
		const comment = await this.prisma.comment.create({
			data: {
				postId: postId,
				parentId: commentId,
				userId: userId,
				content: content
			},
			include: {
				user: {
					select: {
						...userSelect,
						likedComments: true,
					},
				},
				Like: true,
			}
		})
		
		return {
			...comment,
			likes: comment.Like.length
		}
	}
}
