import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { AuthService } from 'src/auth/auth.service'

import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService){}

	findOne(idOrEmailOrUsername: string) {
		return this.prisma.user.findFirst({
			where: {
				OR: [
					{
						id: idOrEmailOrUsername
					},
					{
						email: idOrEmailOrUsername
					},
					{
						username: idOrEmailOrUsername
					}
				]
			},
			select: {
				id: true,
				username: true,
				email: true,
				name: true,
				surname: true,
				bio: true,
				userAvatar: true,
				created_at: true,
				role: true,
			}
		})
	}

	findAll() {
		return this.prisma.user.findMany()
	}

	delete(id: string){
		return this.prisma.user.delete({
			where: {
				id
			}
		})
	}
}
