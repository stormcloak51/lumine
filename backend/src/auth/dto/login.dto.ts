import { IsString, MinLength, MaxLength } from 'class-validator';

export class LoginDto {
  @IsString()
  @MinLength(3, { message: 'Username/email must be at least 3 characters long' })
  @MaxLength(20, { message: 'Username/email must be at most 20 characters long' })
  usernameOrEmail: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}