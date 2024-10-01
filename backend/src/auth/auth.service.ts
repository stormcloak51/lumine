import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
// import { hash, compare } from 'bcrypt'
import * as bcrypt from 'bcrypt';
import { PrismaService } from 'src/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signIn(usernameOrEmail: string, pass: string): Promise<{user: User, access_token: string}> {
    const user = await this.userService.findOne(usernameOrEmail);
    await bcrypt.hash(pass, 10)
    if (user && !(await bcrypt.compare(pass, user.password))) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      user,
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: Partial<User>) {
		const hashedPass: string = await bcrypt.hash(user.password, 10)
    const { password, ...rest } = user
    const selectProps = Object.fromEntries(
      Object.keys(rest).map(key => [key, true])
    );
    selectProps.password = false;

		await this.prisma.user.create({
			data: {
        name: user.name,
        surname: user.surname,
        bio: '',
				email: user.email,
				password: hashedPass,
				username: user.username,
        userAvatar: user.userAvatar,
				role: 'USER'
			},
			select: selectProps
		})
    const payload = { sub: user.id, username: user.username };
    return {
      ...rest,
      bio: '',
      role: 'USER',
      access_token: await this.jwtService.signAsync(payload),
    };
	}
}