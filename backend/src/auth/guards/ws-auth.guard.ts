import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { WsException } from '@nestjs/websockets';
import { AuthenticatedSocket } from '../../config/types/auth.interface';

@Injectable()
export class WsAuthGuard implements CanActivate {
  constructor(private readonly userService: UserService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      const client = context.switchToWs().getClient<AuthenticatedSocket>();
      const userId = client.handshake.;
      

      if (!userId) {
        throw new WsException('Unauthorized: No user ID provided');
      }

      const user = await this.userService.findOne(userId);

      if (!user) {
        throw new WsException('User not found');
      }

      client.user = user;
      return true;
    } catch (err) {
      throw new WsException('Unauthorized');
    }
  }
}