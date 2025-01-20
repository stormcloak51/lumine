'use client'

import { useSocketStore } from '@/shared/stores/socket/socket.store';
import { useEffect, useState } from 'react';

export function SocketTest() {
  const socket = useSocketStore((state) => state.socket);
  const isConnected = useSocketStore((state) => state.isConnected);
  const [lastEvent, setLastEvent] = useState<string>('');

  useEffect(() => {
    if (!socket) return;

    console.log('Current socket state:', {
      socket: !!socket,
      connected: socket?.connected,
      id: socket?.id
    });

    // Тестовый эмит
    socket.emit('ping', null, (response: any) => {
      console.log('Ping response:', response);
      setLastEvent(`Ping response: ${JSON.stringify(response)}`);
    });

    socket.on('pong', (data) => {
      console.log('Pong received:', data);
      setLastEvent(`Pong received: ${JSON.stringify(data)}`);
    });

    return () => {
      socket.off('pong');
    };
  }, [socket]);

  return (
    <div className="p-4 bg-slate-700 rounded">
      <h2 className="text-lg font-bold mb-2 text-white">Socket Status</h2>
      <div className="space-y-2">
        <p>Connected: {isConnected ? 'Yes' : 'No'}</p>
        <p>Socket ID: {socket?.id || 'Not connected'}</p>
        <p>Last Event: {lastEvent || 'None'}</p>
      </div>
    </div>
  );
}