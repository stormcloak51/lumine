import { createContext, useContext, useEffect, useState } from 'react';
import { useSocketStore } from '@/shared/stores/socket/socket.store';

interface SocketProviderProps {
  sessionId?: string;
  children: React.ReactNode;
}

const SocketContext = createContext({});

export function SocketProvider({ sessionId, children }: SocketProviderProps) {
  const { connect, disconnect, isConnected } = useSocketStore();
  const [initialized, setInitialized] = useState(false);

  useEffect(() => {
    console.log('SocketProvider initialized with sessionId:', sessionId);
    
    if (sessionId && !initialized) {
      console.log('Connecting socket...');
      connect(sessionId);
      setInitialized(true);
    }

    return () => {
      if (initialized) {
        console.log('Disconnecting socket...');
        disconnect();
      }
    };
  }, [sessionId, initialized]);

  return (
    <SocketContext.Provider value={{ isConnected }}>
      {children}
    </SocketContext.Provider>
  );
}

export const useSocket = () => useContext(SocketContext);