import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/auth/auth.guard'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Get('all')
  findAll() {
    return this.userService.findAll()
  }

  @UseGuards(AuthGuard)
  @Get(':idOrEmailOrUsername')
  findOne(@Param('idOrEmailOrUsername') idOrEmailOrUsername: string) {
    return this.userService.findOne(idOrEmailOrUsername)
  }

}
