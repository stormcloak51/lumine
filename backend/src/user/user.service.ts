import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService){}

	async create(user: Partial<User>) {
		const hashedPass = await hash(user.password, 10)
		const {password, ...select} = user
		return this.prisma.user.create({
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
	}

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
