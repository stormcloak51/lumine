import { Body, Controller, Post, HttpCode, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('auth')
  signIn(@Body() data: { email: string; password: string }) {
    return this.authService.signIn(data.email, data.password);
  }
}
