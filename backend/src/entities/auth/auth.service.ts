import { UserDto } from '@/src/infrastructure/dtos/user.dto'
import {
    Injectable,
    InternalServerErrorException,
    NotFoundException,
    UnauthorizedException
} from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as argon from 'argon2'
import { plainToInstance } from 'class-transformer'
import { Request, Response } from 'express'
import { User } from 'prisma/__generated__'
import { UserService } from '../user/user.service'
import { LoginDto } from './dto/login.dto'
import { RegisterDto } from './dto/register.dto'

@Injectable()
export class AuthService {
  constructor( private readonly userService: UserService, private readonly configService: ConfigService ) {}

  async register(req: Request, dto: RegisterDto): Promise<UserDto> {
    const newUser = await this.userService.create(dto)


    return this.saveSession(req, newUser)
  }

  async login(req: Request, dto: LoginDto) {
    const user = await this.userService.findOne(dto.usernameOrEmail)

    if (!user) {
      throw new NotFoundException('User with such credentials does not exist')
    }

    const isValidPass = await argon.verify(user.password, dto.password)

    if (!isValidPass) {
      throw new UnauthorizedException('Password is incorrect, please try again')
    }

    return this.saveSession(req, user) 
  }

  async logout(req: Request, res: Response): Promise<void> {
    return new Promise((resolve, reject) => {
      req.session.destroy(err => {
        if (err) {
          return reject(
            new InternalServerErrorException('Failed to destroy session. Session is already destroyed or try again later')
          )
        }

        res.clearCookie(this.configService.getOrThrow<string>('SESSION_NAME'))
        resolve()
      })
    })
  }

  private async saveSession(req: Request, user: User): Promise<UserDto> {
    return new Promise((resolve, reject) => {
      req.session.userId = user.id

      req.session.save(err => {
        if (err) return reject(new InternalServerErrorException('Failed to save session. Please check parameters and try again'))
        const plainedUser = plainToInstance(UserDto, user)
        resolve(plainedUser)
      })
    })
  }
}
