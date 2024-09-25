import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { Prisma } from '@prisma/client'

@Controller('fetch')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
