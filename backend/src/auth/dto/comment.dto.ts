import { Transform } from 'class-transformer'
import { IsNumber, IsString } from 'class-validator'

export class GetCommentsDto {
	@IsNumber()
	commentId?: number

	@IsNumber()
	postId: number

	@IsNumber()
	page: number
}

export class CreateCommentDto {

	@Transform(({value}) => parseInt(value))
	postId: number;

	@Transform(({value}) => parseInt(value))
	commentId?: number

	@IsString()
	content: string
}

export class DeleteCommentDto {
	@IsNumber()
	commentId: number

	@IsNumber()
	postId: number
}

export class EditCommentDto {
	@IsNumber()
	commentId: number

	@IsNumber()
	postId: number

	@IsString()
	content: string
}

export class LikeCommentDto {
	@IsNumber()
	commentId: number

	@IsNumber()
	postId: number

	@IsString()
	userId: string
}