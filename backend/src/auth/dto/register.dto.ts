import { IsString, MinLength, MaxLength, Matches, IsEmail, IsUrl } from 'class-validator';

export class RegisterDto {


	@IsString()
	@MinLength(3, { message: 'Name must be at least 3 characters long' })
	@MaxLength(13, { message: 'Name must be at most 13 characters long' })
	name: string;

	@IsString()
	@MinLength(3, { message: 'Surname must be at least 3 characters long' })
	@MaxLength(13, { message: 'Surname must be at most 13 characters long' })
	surname: string;

	@IsString()
	@MinLength(3, { message: 'Username must be at least 3 characters long' })
	@MaxLength(20, { message: 'Username must be at most 20 characters long' })
	username: string;

  @IsEmail()
	@MinLength(6, { message: 'Email must be at least 6 characters long' })
	email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

	@IsString()
	@IsUrl()
	userAvatar: string;
}