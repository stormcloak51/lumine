import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common'
import { Prisma } from 'prisma/__generated__'
import { hash } from 'argon2'
import { RegisterDto } from 'src/auth/dto/register.dto'
import { UpdateUserDto } from 'src/dtos/user.dto'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: RegisterDto) {
    await this.checkUserExists(dto)
    const password: string = await hash(dto.password);
    const data = {
      ...dto,
      password,
      bio: '',
    };

    return await this.prisma.user.create({
      data,
    });
  }

  findOne(idOrEmailOrUsername: string, ) {
    const user = this.prisma.user.findFirst({
      where: {
        OR: [
          {
            id: idOrEmailOrUsername,
          },
          {
            email: idOrEmailOrUsername,
          },
          {
            username: idOrEmailOrUsername,
          },
        ],
      },
    });
    if (!user) throw new NotFoundException('User not found');

    return user
  }

  async checkUserExists(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: dto.email },
          { username: dto.username }
        ],
      }
    })

    if (existingUser) {
      throw new HttpException('User with this email or username already exists', HttpStatus.CONFLICT);
    }

    return existingUser
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  async update({ id, dto }: { id: string; dto: UpdateUserDto }) {
    try {
      const updatedUser = await this.prisma.user.update({
        where: {
          id,
        },
        data: {
          ...dto,
        },
      });
      return updatedUser;
    } catch (err) {
      if (err instanceof Prisma.PrismaClientKnownRequestError
      ) {
        if (err.code === 'P2002') {
          const errorMessage = err.message;
					const conflictingField = errorMessage.match(/Unique constraint failed on the fields: \((.*)\)/)[1];
	
					throw new HttpException(`User with this ${conflictingField} already exists`, HttpStatus.CONFLICT);
        }
      }
    }
  }

  delete(id: string) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
