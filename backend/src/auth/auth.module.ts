import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt'
import { env } from 'process'
import { PrismaService } from 'src/prisma.service'
import { UserService } from 'src/user/user.service'

@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, UserService],
  exports: [AuthService]
})
export class AuthModule {}
