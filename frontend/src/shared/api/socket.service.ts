import { io, Socket } from 'socket.io-client';

let socket: Socket | null = null;

export const getSocket = (userId: string) => {
  if (!socket || !socket.connected) {
    socket = io('http://localhost:1488/friendship', {
      withCredentials: true,
      transports: ['websocket'],
      query: { userId },
      autoConnect: true,
    });

    // Add connection status logging
    socket.on('connect', () => {
      console.log('Socket connected with userId:', userId);
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
    });
  }
  return socket;
};