import { ArrayMaxSize, IsArray, IsNumber, IsObject, IsString, IsUrl, ValidateNested } from 'class-validator'
import {Type} from 'class-transformer'
import { UserDto } from './user.dto'

export class CreatePostDto {
	@IsString()
	content: string
}

export class EditPostDto {
	@IsNumber()
	postId: number

	@IsString()
	UserDtoId: string

	@IsString()
	content: string
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