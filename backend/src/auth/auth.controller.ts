import {
  Body,
  Controller,
  HttpCode,
  Post,
  Req,
  Res,
  UnauthorizedException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto'
import { Request, Response } from 'express'

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UsePipes(new ValidationPipe())
  @Post('login')
  @HttpCode(200)
  async signIn(@Body() dto: LoginDto, @Res({passthrough: true}) res: Response) {

    const {refreshToken, ...response} = await this.authService.login(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response
  }

  @UsePipes(new ValidationPipe())
  @HttpCode(200)
  @Post('register')
  async register(@Body() dto: RegisterDto, @Res({passthrough: true}) res: Response) {
    const {refreshToken, ...response} = await this.authService.register(dto);
    this.authService.addRefreshTokenToResponse(res, refreshToken);

    return response
  }

  @HttpCode(200)
  @Post('login/access-token')
  async getNewTokens(@Req() req: Request, @Res({passthrough: true}) res: Response) {
    const refreshTokenFromCookies = await req.cookies['refresh_token']

    if (!refreshTokenFromCookies) {
      this.authService.removeRefreshTokenFromResponse(res);
      throw new UnauthorizedException('Refresh token not found')
    }

    const {refreshToken, ...response} = await this.authService.getNewTokens(refreshTokenFromCookies)

    this.authService.addRefreshTokenToResponse(res, refreshToken)

    return response
  }

  @HttpCode(200)
  @Post('logout')
  async logout(@Res({passthrough: true}) res: Response) {
    this.authService.removeRefreshTokenFromResponse(res);

    return true
  }
}
