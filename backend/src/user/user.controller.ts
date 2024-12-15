import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dtos/user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':idOrEmailOrUsername')
  async findOne(@Param('idOrEmailOrUsername') idOrEmailOrUsername: string) {
    return await this.userService.findOne(idOrEmailOrUsername);
    
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update({ id, dto });
  }
}
