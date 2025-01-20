import { User } from 'prisma/__generated__';
import { Socket } from 'socket.io'

export interface AuthenticatedSocket extends Socket {
  auth: {
    userId: string;
  };
  user?: User;
}