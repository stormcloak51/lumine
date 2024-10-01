import { IsString, MinLength, MaxLength, Matches } from 'class-validator';

export class SignInDto {
  @IsString()
  @MinLength(3, { message: 'Username/email must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username/email must be at most 20 characters long' })
  // @Matches(/^[a-zA-Z0-9@.]+$/, { message: 'Username/email must only contain letters, numbers, @, and .' })
  usernameOrEmail: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}