import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const useWebSocket = (url: string) => {
    const [socket, setSocket] = useState<any>(null);
    const [messages, setMessages] = useState<any[]>([]);

    useEffect(() => {
        const socketIo = io(url);
        setSocket(socketIo);

        socketIo.on('postCreated', (newPost) => {
            setMessages((prevMessages) => [...prevMessages, newPost]);
        });

        return () => {
            socketIo.disconnect();
        };
    }, [url]);

    return { messages, socket };
};

export default useWebSocket;