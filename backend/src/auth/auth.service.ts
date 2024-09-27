import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service';
import { JwtService } from '@nestjs/jwt'
import { hash, compare } from 'bcrypt'
import { PrismaService } from 'src/prisma.service'
import { User } from '@prisma/client'

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService
  ) {}

  async signIn(email: string, pass: string, isHashed: boolean): Promise<{access_token: string}> {
    
    const user = await this.userService.findOne(email);
    console.log(pass, user.password)
    const hashedPass = isHashed ? pass : await hash(pass, 10)
    console.log(hashedPass, user.password)
    if (user && !(hashedPass === user.password)) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(user: Partial<User>) {
		const hashedPass = await hash(user.password, 10)
		await this.prisma.user.create({
			data: {
				email: user.email,
				password: hashedPass,
				username: user.username,
				role: 'USER'
			},
			select: {
				id: true,
				username: true,
				email: true,
				updated_at: true,
				created_at: true,
				role: true,
			}
		})
    return this.signIn(user.email, hashedPass, true)
	}
}