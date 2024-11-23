import { IsString } from 'class-validator'


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