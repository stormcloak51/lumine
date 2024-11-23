import { Injectable } from '@nestjs/common';
import { User } from '@prisma/client'
import { hash } from 'bcrypt'
import { AuthService } from 'src/auth/auth.service'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { UpdateUserDto } from 'src/dtos/user.dto'

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
		})
	}



	findAll() {
		return this.prisma.user.findMany()
	}

	update({id, dto}: {id: string, dto: UpdateUserDto} ){
		console.log('Updating user:', { id, dto });
		return this.prisma.user.update({
			where: {
				id
			},
			data: {
				...dto
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
