import { SetMetadata } from '@nestjs/common'
import { RoleType } from 'prisma/__generated__'



export const ROLES_KEY = 'roles'

export const Roles = (...roles: RoleType[]) => SetMetadata(ROLES_KEY, roles)