import { Exclude } from 'class-transformer'
import { IsDateString, IsEnum, IsString } from 'class-validator'

export class UserDto {
	@IsString()
	username: string

	@IsString()
	email: string

	@IsString()
	userAvatar: string

	@Exclude()
	password: string

	@IsString()
	userCover: string

	@IsString()
	name: string

	@IsString()
	surname: string

	@IsString()
	id: string

	@IsString()
	bio: string

	@IsEnum(['ADMIN', 'USER'])
	role: string

	@IsDateString()
	created_at: Date

	@IsDateString()
	updated_at: Date
}

export class UpdateUserDto {
	@IsString()
	name?: string

	@IsString()
	surname?: string

	@IsString()
	username?: string

	@IsString()
	email?: string

	@IsString()
	userAvatar?: string

	@IsString()
	userCover?: string

	@IsString()
	bio?: string
}