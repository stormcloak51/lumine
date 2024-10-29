import { Injectable } from '@nestjs/common';
import { CreateCommentDto, DeleteCommentDto, EditCommentDto, GetCommentsDto } from 'src/auth/dto/comment.dto'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class CommentService {
	constructor(private readonly prisma: PrismaService) {}

	async getById(dto: GetCommentsDto){
		return await this.prisma.comment.findMany({
			where: {
				postId: dto.postId
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
			}
		})
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
				user: true,
				Like: true,
			}
		})
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
