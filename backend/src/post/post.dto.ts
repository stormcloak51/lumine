import { IsObject, IsString, ValidateNested } from 'class-validator'
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