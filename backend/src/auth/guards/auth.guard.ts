import {CanActivate, ExecutionContext, ForbiddenException, Injectable, UnauthorizedException} from '@nestjs/common'
import { UserService } from 'src/user/user.service'

@Injectable()
export class AuthGuard implements CanActivate {
	constructor(private readonly userService: UserService) {}
	
	async canActivate(context: ExecutionContext): Promise<boolean> {
		const request = context.switchToHttp().getRequest()

		if (typeof request.session === 'undefined') {
			throw new ForbiddenException('You are not logged in')
		}

		const user = await this.userService.findOne(request.session.userId)

		if (!user) {
			throw new UnauthorizedException('User not found, please check your credentials')
		}

		request.user = user

		return true
	}
}