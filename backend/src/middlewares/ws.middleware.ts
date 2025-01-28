import { Injectable } from '@nestjs/common';
import { Socket, Server } from 'socket.io';

@Injectable()
export class AuthSocketMiddleware {
  use(socket: Socket, next: Function) {
    const userId = socket.handshake.query.userId;  // Или другой способ получения данных о пользователе
    if (userId) {
      socket.user = { id: userId as string };  // Добавляем информацию о пользователе в сокет
      next();
    } else {
      next(new Error('Unauthorized'));
    }
  }
}