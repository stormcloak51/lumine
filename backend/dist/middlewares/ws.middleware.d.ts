import { Socket } from 'socket.io';
export declare class AuthSocketMiddleware {
    use(socket: Socket, next: Function): void;
}
