import { Injectable, UnauthorizedException } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import {Strategy, ExtractJwt} from 'passport-jwt'
import { UserService } from 'src/user/user.service'
import { AuthService } from './auth.service'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
	constructor(
		private configService: ConfigService,
		private userService: UserService,
		
	){
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get('JWT_SECRET')
		})
	}

	async validate({id}: { id: string }){
		const user = await this.userService.findOne(id)

		if (!user) throw new UnauthorizedException('лох ебанный')

		return user
	}
}