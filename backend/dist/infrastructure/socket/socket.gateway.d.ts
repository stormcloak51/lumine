import { Server, Socket } from 'socket.io';
export declare class SocketGateway {
    server: Server;
    afterInit(server: Server): void;
    handleConnection(client: Socket): void;
    handleDisconnect(client: Socket): void;
    handlePing(client: Socket): {
        status: string;
    };
}
