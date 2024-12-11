import { ArrayMaxSize, IsArray, IsNumber, IsObject, IsString, IsUrl, ValidateNested } from 'class-validator'
import {Type} from 'class-transformer'
import { User } from './user.dto'

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

// ==================== DRAFTS ====================

export class UpsertDraftDto {
	@IsString()
	content: string

	@IsArray()
	@ArrayMaxSize(7)
	@IsUrl({}, {each: true})
	media: {
		url: string,
		key: string
	}[]
}