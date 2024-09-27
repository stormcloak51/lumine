import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from '@prisma/client'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}


  @Post('create')
  create(@Body() user: Partial<User>) {
    return this.userService.create(user)
  }

  @Get('all')
  findAll() {
    return this.userService.findAll()
  }

  @Get(':idOrEmailOrUsername')
  findOne(@Param('idOrEmailOrUsername') idOrEmailOrUsername: string) {
    return this.userService.findOne(idOrEmailOrUsername)
  }

}
