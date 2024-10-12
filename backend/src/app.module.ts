import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostModule } from './post/post.module';
import { PostService } from './post/post.service';
import { PrismaService } from './prisma.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt'
import { env } from 'process'

@Module({
  imports: [ConfigModule.forRoot(), PostModule, UserModule, AuthModule, JwtModule.register({
    global: true,
    secret: env.JWT_SECRET,
    signOptions: { expiresIn: '2m' },
  }),],
  controllers: [AppController],
  providers: [AppService, PostService, PrismaService],
})
export class AppModule {}
