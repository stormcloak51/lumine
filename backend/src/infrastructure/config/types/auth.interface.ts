// src/config/types/auth.interface.ts
import { User } from 'prisma/__generated__';
import { Socket } from 'socket.io';

export interface AuthenticatedSocket extends Socket {
  user: User;
  handshake: Socket['handshake'] & {
    session: {
      userId: string;
      [key: string]: any;
    };
  };
}