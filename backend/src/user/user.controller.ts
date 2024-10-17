import { Body, Controller, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { Request } from 'express'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAll() {
    return this.userService.findAll()
  }

  @Get(':idOrEmailOrUsername')
  async findOne(@Param('idOrEmailOrUsername') idOrEmailOrUsername: string) {
    const user = this.userService.findOne(idOrEmailOrUsername)
    return user
  }

  @Get('current')
  async findCurrent(@Req() req: Request) {
    console.log(req, 'req')
    // const user = await this.userService.findCurrent(req.)
    // return user
  }
}
