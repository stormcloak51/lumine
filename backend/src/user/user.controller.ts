import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDto } from 'src/dtos/user.dto';
import { Authorization } from 'src/auth/decorators/auth.decorator'

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Authorization('ADMIN')
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':idOrEmailOrUsername')
  async findOne(@Param('idOrEmailOrUsername') idOrEmailOrUsername: string) {
    return await this.userService.findOne(idOrEmailOrUsername);
    
  }

  @Authorization()
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update({ id, dto });
  }
}
