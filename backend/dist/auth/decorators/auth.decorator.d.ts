import { RoleType } from 'prisma/__generated__';
export declare function Authorization(...roles: RoleType[]): <TFunction extends Function, Y>(target: TFunction | object, propertyKey?: string | symbol, descriptor?: TypedPropertyDescriptor<Y>) => void;
