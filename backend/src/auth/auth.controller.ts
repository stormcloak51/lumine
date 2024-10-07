import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  Res,
  UseGuards
} from '@nestjs/common';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { User } from '@prisma/client'
import { SignInDto } from './dto/signIn.dto'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: SignInDto) {
    return this.authService.signIn(signInDto.usernameOrEmail, signInDto.password);
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }

  @Post('signup')
  signUp(@Body() user: Partial<User>) {
    return this.authService.signUp(user)
  }
  @Post('logout')
  logout(@Res() response: Response) {
  }

  @UseGuards(AuthGuard)
  @Get('isAuthenticated')
  isAuthenticated() {
    return this.authService.isAuthenticated();
  }
}