import { IoAdapter } from '@nestjs/platform-socket.io';
import { INestApplicationContext } from '@nestjs/common';
import { Server, ServerOptions } from 'socket.io';
import session from 'express-session';

const sharedsession = require('express-socket.io-session');

export class SessionAdapter extends IoAdapter {
  private sessionMiddleware: any;

  constructor(app: INestApplicationContext) {
    super(app);
    
    this.sessionMiddleware = session({
      secret: process.env.SESSION_SECRET || 'your-secret-key',
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
      },
    });
  }

  createIOServer(port: number, options?: ServerOptions) {
    const server: Server = super.createIOServer(port, options);

    server.use(sharedsession(this.sessionMiddleware, {
      autoSave: true
    }));

    return server;
  }
}

