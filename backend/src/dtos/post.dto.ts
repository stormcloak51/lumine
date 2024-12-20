import { ArrayMaxSize, IsArray, IsNumber, IsObject, IsString, IsUrl, ValidateNested } from 'class-validator'
import {Type} from 'class-transformer'
import { UserDto } from './user.dto'

export class CreatePostDto {
	@IsString()
	content: string

	@IsObject()
	@ValidateNested()
	@Type(() => UserDto)
	UserDto: UserDto
}

export class LikePostDto {
	@IsNumber()
	postId: number

	@IsObject()
	@ValidateNested()
	@Type(() => UserDto)
	UserDto: UserDto
}

export class EditPostDto {
	@IsNumber()
	postId: number

	@IsString()
	UserDtoId: string

	@IsString()
	content: string
}

export class DeletePostDto {
	@IsNumber()
	postId: number

	@IsString()
	UserDtoId: string
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