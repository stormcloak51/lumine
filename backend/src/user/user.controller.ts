import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}



  @Get('all')
  findAll() {
    return this.userService.findAll()
  }

  @Get(':idOrEmailOrUsername')
  findOne(@Param('idOrEmailOrUsername') idOrEmailOrUsername: string) {
    return this.userService.findOne(idOrEmailOrUsername)
  }

}
