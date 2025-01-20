"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SessionAdapter = void 0;
const platform_socket_io_1 = require("@nestjs/platform-socket.io");
const express_session_1 = __importDefault(require("express-session"));
const sharedsession = require('express-socket.io-session');
class SessionAdapter extends platform_socket_io_1.IoAdapter {
    constructor(app) {
        super(app);
        this.sessionMiddleware = (0, express_session_1.default)({
            secret: process.env.SESSION_SECRET || 'your-secret-key',
            resave: false,
            saveUninitialized: false,
            cookie: {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 1000 * 60 * 60 * 24 * 7,
            },
        });
    }
    createIOServer(port, options) {
        const server = super.createIOServer(port, options);
        server.use(sharedsession(this.sessionMiddleware, {
            autoSave: true
        }));
        return server;
    }
}
exports.SessionAdapter = SessionAdapter;
//# sourceMappingURL=session.adapter.js.map