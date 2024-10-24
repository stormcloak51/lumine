import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { AuthService } from 'src/auth/auth.service'
import { RegisterDto } from 'src/auth/dto/register.dto'

import { PrismaService } from 'src/prisma.service'

@Injectable()
export class UserService {
	constructor(private readonly prisma: PrismaService){}

	async create(dto: RegisterDto){
		const password: string = await hash(dto.password, 10)
		const data = {
			...dto,
			password,
			bio: '',
		}

		return this.prisma.user.create({
			data
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
				likedPosts: true
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
