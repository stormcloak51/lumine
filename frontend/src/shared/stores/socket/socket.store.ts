// store/socket.store.ts
import { io, Socket } from 'socket.io-client';
import { create } from 'zustand';

interface ISocketStore {
  socket: Socket | null;
  isConnected: boolean;
  connect: (sessionId: string) => void;
  disconnect: () => void;
}

export const useSocketStore = create<ISocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  connect: (sessionId: string) => {
    // Проверяем, нет ли уже активного соединения
    const currentSocket = get().socket;
    if (currentSocket?.connected) {
      console.log('Socket already connected, skipping connection');
      return;
    }

    if (!process.env.NEXT_PUBLIC_SERVER_URL) {
      console.error('NEXT_PUBLIC_SERVER_URL is not defined');
      return;
    }

    console.log('Attempting to connect to:', process.env.NEXT_PUBLIC_SERVER_URL);
    console.log('With sessionId:', sessionId);

    const socket = io(process.env.NEXT_PUBLIC_SERVER_URL, {
      auth: { sessionId },
      withCredentials: true,
      transports: ['websocket', 'polling'],
      autoConnect: true,
    });

    socket.on('connect', () => {
      console.log('Socket connected successfully');
      console.log('Socket ID:', socket.id);
      set({ isConnected: true });
    });

    socket.on('connect_error', (error) => {
      console.error('Socket connection error:', error);
      set({ isConnected: false });
    });

    socket.on('disconnect', (reason) => {
      console.log('Socket disconnected:', reason);
      set({ isConnected: false });
    });

    socket.on('error', (error) => {
      console.error('Socket error:', error);
      set({ isConnected: false });
    });

    set({ socket });
  },
  disconnect: () => {
    const socket = get().socket;
    if (socket) {
      console.log('Disconnecting socket');
      socket.disconnect();
    }
    set({ socket: null, isConnected: false });
  },
}));