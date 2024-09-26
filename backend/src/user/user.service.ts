import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService){}

	create(user: Partial<User>) {
		return this.prisma.user.create({
			data: {
				email: user.email,
				password: user.password,
				username: user.username,
				roles: ['USER']
			}
		})

	}

	findOne(idOrEmail: string) {
		return this.prisma.user.findFirst({
			where: {
				OR: [
					{
						id: idOrEmail
					},
					{
						email: idOrEmail
					}
				]
			}
		})

	}

	delete(id: string){
		return this.prisma.user.delete({
			where: {
				id
			}
		})
	}
}
