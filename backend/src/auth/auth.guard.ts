import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JsonWebTokenError, JwtService, TokenExpiredError } from '@nestjs/jwt';
import { Request } from 'express';
import { env } from 'process'

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    console.log(token, 'token epta')
    console.log(env.JWT_SECRET, 'jwt sectet token epta')
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: env.JWT_SECRET
      });
      request['user'] = payload;
      console.log('Token verified successfully', payload);
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        console.error('Token has expired');
        throw new UnauthorizedException('Token has expired');
      } else if (error instanceof JsonWebTokenError) {
        console.error('Invalid token');
        throw new UnauthorizedException('Invalid token');
      } else {
        console.error('Unexpected error during token verification', error);
        throw new UnauthorizedException('Authentication failed');
      }
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}