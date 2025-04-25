import { Exclude } from 'class-transformer'
import { IsDateString, IsEnum, IsOptional, IsString } from 'class-validator'


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
	@IsOptional()
	@IsString()
	name?: string

	@IsOptional()
	@IsString()
	surname?: string

	@IsOptional()
	@IsString()
	username?: string

	@IsOptional()
	@IsString()
	email?: string

	@IsOptional()
	@IsString()
	userAvatar?: string

	@IsOptional()
	@IsString()
	userCover?: string

	@IsOptional()
	@IsString()
	bio?: string
}