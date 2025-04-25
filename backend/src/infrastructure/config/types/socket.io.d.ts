import { Session } from 'express-session';
import { User } from 'prisma/__generated__';

declare module 'socket.io' {
  interface Handshake {
    session: Session & {
      userId: string;
    };
  }

  interface Socket {
    user: {id: string}
  }
}
