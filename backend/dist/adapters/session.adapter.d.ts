import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { Server, ServerOptions } from 'socket.io';
export declare class SessionAdapter extends IoAdapter {
    private sessionMiddleware;
    constructor(app: INestApplicationContext);
    createIOServer(port: number, options?: ServerOptions): Server<import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, import("socket.io").DefaultEventsMap, any>;
}
