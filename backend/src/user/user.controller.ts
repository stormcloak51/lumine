import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client'
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @UseGuards(AuthGuard)
  @Get('all')
  findAll() {
    return this.userService.findAll()
  }

  @Get(':idOrEmailOrUsername')
  findOne(@Param('idOrEmailOrUsername') idOrEmailOrUsername: string) {
    return this.userService.findOne(idOrEmailOrUsername)
  }

}
