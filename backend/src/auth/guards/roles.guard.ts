import { Injectable, CanActivate, ExecutionContext, ForbiddenException } from '@nestjs/common'
import { Reflector } from '@nestjs/core'
import { RoleType } from 'prisma/__generated__'
import { ROLES_KEY } from '../decorators/roles.decorator'



@Injectable()
export class RolesGuard implements CanActivate {
	constructor(private readonly reflector: Reflector) {}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		const roles = this.reflector.getAllAndOverride<RoleType[]>(ROLES_KEY, [
			context.getHandler(),
			context.getClass()
		])

		const request = context.switchToHttp().getRequest()

		if (!roles) return true

		if (!roles.includes(request.user.role)) {
			throw new ForbiddenException('You are not allowed to perform this action')
		}

		return true
	}
}