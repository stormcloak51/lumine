import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':idOrEmailOrUsername')
  async findOne(@Param('idOrEmailOrUsername') idOrEmailOrUsername: string) {
    const user = this.userService.findOne(idOrEmailOrUsername);
    return user;
  }

}
