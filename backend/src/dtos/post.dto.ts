import { IsNumber, IsObject, IsString, ValidateNested } from 'class-validator'
import {Type} from 'class-transformer'
class User {
	@IsString()
	username: string

	@IsString()
	email: string

	@IsString()
	userAvatar: string

	@IsString()
	name: string

	@IsString()
	surname: string

	@IsString()
	id: string
}

export class CreatePostDto {
	@IsString()
	content: string

	@IsObject()
	@ValidateNested()
	@Type(() => User)
	User: User
}

export class LikePostDto {
	@IsNumber()
	postId: number

	@IsObject()
	@ValidateNested()
	@Type(() => User)
	user: User
}

export class EditPostDto {
	@IsNumber()
	postId: number

	@IsString()
	userId: string

	@IsString()
	content: string
}

export class DeletePostDto {
	@IsNumber()
	postId: number

	@IsString()
	userId: string
}