import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { User, Prisma } from '@prisma/client';
import { hash } from 'bcrypt';
import { AuthService } from 'src/auth/auth.service';
import { RegisterDto } from 'src/auth/dto/register.dto';
import { UpdateUserDto } from 'src/dtos/user.dto';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class UserService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: RegisterDto) {
    const password: string = await hash(dto.password, 10);
    const data = {
      ...dto,
      password,
      bio: '',
    };

    return this.prisma.user.create({
      data,
    });
  }

  findOne(idOrEmailOrUsername: string) {
    return this.prisma.user.findFirst({
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
      if (err instanceof Prisma.PrismaClientKnownRequestError) {
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
