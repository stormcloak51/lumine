import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service';
import { UserService } from '../user/user.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { Response } from 'express';

@Injectable()
export class AuthService {
  EXPIRE_DAY_REFRESH_TOKEN = 1;
  REFRESH_TOKEN_NAME = 'refreshToken';

  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async login(dto: LoginDto) {
    const { password, ...user } = await this.validateUser(dto);

    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async register(dto: RegisterDto) {
    const oldUser = await this.userService.findOne(dto.email);

    if (oldUser) throw new BadRequestException('User already exists');

    const { password, ...user } = await this.userService.create(dto);

    const tokens = this.issueTokens(user.id);

    return {
      user,
      ...tokens,
    };
  }

  async getNewTokens(refreshToken: string){
    const result = await this.jwtService.verifyAsync(refreshToken)
    if (!result) throw new UnauthorizedException('Invalid refresh token')

    const user  = await this.userService.findOne(result.id)

    const tokens = this.issueTokens(user.id)

    return {
      user,
      ...tokens
    }
  }

  private issueTokens(userId: string) {
    const data = { id: userId };

    const accessToken = this.jwtService.sign(data, {
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(data, {
      expiresIn: '7d',
    });

    return { accessToken, refreshToken };
  }

  private async validateUser(dto: LoginDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          {
            id: dto.usernameOrEmail,
          },
          {
            email: dto.usernameOrEmail,
          },
          {
            username: dto.usernameOrEmail,
          },
        ],
      },
    });

    if (!user) throw new NotFoundException('User not found');

    const isValid = await bcrypt.compare(dto.password, user.password);

    if (!isValid) throw new UnauthorizedException('Invalid password');

    return user;
  }

  addRefreshTokenToResponse(res: Response, refreshToken: string) {
    const expiresIn = new Date();
    expiresIn.setDate(expiresIn.getDate() + this.EXPIRE_DAY_REFRESH_TOKEN);

    res.cookie(this.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      domain: 'localhost',
      expires: expiresIn,
      secure: true,
      sameSite: 'none',
    });
  }

  removeRefreshTokenFromResponse(res: Response) {
    res.cookie(this.REFRESH_TOKEN_NAME, '', {
      httpOnly: true,
      domain: 'localhost',
      expires: new Date(0),
      secure: true,
      sameSite: 'none',
    });
  }

  // async signIn(usernameOrEmail: string, pass: string, res: Response): Promise<{user: Partial<User>, access_token: string}> {
  //   const user = await this.prisma.user.findFirst({
  //     where: {
  //       OR: [
  //         {
  //           id: usernameOrEmail,
  //         },
  //         {
  //           email: usernameOrEmail,
  //         },
  //         {
  //           username: usernameOrEmail,
  //         },
  //       ],
  //     },
  //   });
  //   await bcrypt.hash(pass, 10)
  //   if (user && !(await bcrypt.compare(pass, user.password))) {
  //     throw new UnauthorizedException();
  //   }
  //   const payload = { sub: user.id, username: user.username };

  //   const accessToken = await this.jwtService.signAsync(payload, {
  //     expiresIn: '15m'
  //   });

  //   const refreshToken = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

  //   res.cookie('refresh_token', refreshToken, {
  //     httpOnly: true,
  //     sameSite: 'strict',
  //     secure: false,
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //   });

  //   res.cookie('access_token', accessToken, {
  //     httpOnly: false,
  //     sameSite: 'strict',
  //     secure: false,
  //     maxAge: 15 * 60 * 1000,
  //   })
  //   await this.prisma.user.update({
  //     where: {
  //       id: user.id
  //     },
  //     data: {
  //       refresh_token: refreshToken
  //     }
  //   })
  //   const { password, refresh_token, ...userWithoutSensetiveData } = user
  //   return {
  //     user: userWithoutSensetiveData,
  //     access_token: accessToken
  //   };
  // }

  // async signUp(user:User, res: Response): Promise<{user: Partial<User>, access_token: string}> {
  // 	const hashedPass: string = await bcrypt.hash(user.password, 10)
  //   const { password, ...rest } = user

  //   const newUser = await this.prisma.user.create({
  //     data: {
  //       ...rest,
  //       password: hashedPass,
  //       role: 'USER',
  //       bio: '',
  //       refresh_token: '',
  //     },
  //     select: {
  //       id: true,
  //       name: true,
  //       surname: true,
  //       email: true,
  //       username: true,
  //       userAvatar: true,
  //       bio: true,
  //       role: true,
  //     },
  //   });
  //   const payload = { sub: newUser.id, username: newUser.username };

  //   const access_token = await this.jwtService.signAsync(payload, { expiresIn: '15m' });
  //   const refresh_token = await this.jwtService.signAsync(payload, { expiresIn: '7d' });

  //   res.cookie('refresh_token', refresh_token, {
  //     httpOnly: true,
  //     sameSite: 'strict',
  //     secure: false,
  //     maxAge: 7 * 24 * 60 * 60 * 1000,
  //   });

  //   res.cookie('access_token', access_token, {
  //     httpOnly: false,
  //     sameSite: 'strict',
  //     secure: false,
  //     maxAge: 15 * 60 * 1000,
  //   });

  //   await this.prisma.user.update({
  //     where: {
  //       id: newUser.id
  //     },
  //     data: {
  //       refresh_token
  //     }
  //   })

  //   return {
  //     user: newUser,
  //     access_token,
  //   };
  // }

  // async refreshToken(refreshToken: string) {
  //   try {
  //     const payload = await this.jwtService.verifyAsync(refreshToken);
  //     const user = await this.prisma.user.findUnique({
  //       where: { id: payload.sub }
  //     });

  //     if (!user) {
  //       throw new UnauthorizedException('User not found');
  //     }

  //     const newPayload = { sub: user.id, username: user.username };
  //     const access_token = await this.jwtService.signAsync(newPayload);
  //     const new_refresh_token = await this.jwtService.signAsync(newPayload, { expiresIn: '7d' });

  //     return {
  //       access_token,
  //       refresh_token: new_refresh_token
  //     };
  //   } catch (error) {
  //     throw new UnauthorizedException('Invalid refresh token');
  //   }
  // }

  // async logout(userId: string, res: Response): Promise<void> {
  //   await this.prisma.user.update({
  //     where: { id: userId },
  //     data: { refresh_token: '' },
  //   });

  //   res.clearCookie('refresh_token');
  //   res.clearCookie('access_token');
  // }
}
