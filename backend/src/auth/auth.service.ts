import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common'
import { Request, Response } from 'express'
import { UserService } from '../user/user.service'
import { RegisterDto } from './dto/register.dto'
import { User } from 'prisma/__generated__'
import { UserDto } from 'src/dtos/user.dto'
import { plainToInstance } from 'class-transformer'
import { LoginDto } from './dto/login.dto'
import * as argon from 'argon2'
import { ConfigService } from '@nestjs/config'

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
