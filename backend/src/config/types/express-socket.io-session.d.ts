declare module 'express-socket.io-session' {
  import { RequestHandler } from 'express';
  import { Socket } from 'socket.io';

  function expressSocketIoSession(session: any, options?: any): (socket: Socket, next: (err?: any) => void) => void;

  export = expressSocketIoSession;
}