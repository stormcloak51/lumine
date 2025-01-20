import { useSocketStore } from '@/shared/stores/socket/socket.store'
import { useFriendshipStore } from './friendship.store'
import { useCallback, useEffect, useState } from 'react'
import { FriendshipService } from '@/shared/api/friendship.service'
import { IUser } from '@/shared/config/types/user.types'
import { IFriendRequest } from '@/shared/config/types/friend.types'

export function useFriendship() {
  const socket = useSocketStore((state) => state.socket);
  const {
    friends,
    requests,
    setFriends,
    setRequests,
    addFriend,
    removeFriend,
    addRequest,
    updateRequest,
  } = useFriendshipStore();

	const [frienshipService, setFriendshipService] = useState<FriendshipService | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!socket) return;

    setFriendshipService(new FriendshipService(socket));

    // Загружаем начальные данные
    const loadInitialData = async () => {
      try {
        const [friendsData, requestsData] = await Promise.all([
          FriendshipService.getFriends(),
          FriendshipService.getFriendRequests(),
        ]);
        setFriends(friendsData);
        setRequests(requestsData);
      } finally {
        setLoading(false);
      }
    };

    loadInitialData();

    // Подписываемся на события
    socket.on('friendRequest', ({ request }: { request: IFriendRequest }) => {
      addRequest(request);
    });

    socket.on('friendRequestAccepted', ({ friend }: { friend: IUser }) => {
      addFriend(friend);
    });

    socket.on('friendRequestDeclined', ({ requestId }) => {
      updateRequest(requestId, 'DECLINED');
    });

    socket.on('friendRemoved', ({ userId }) => {
      removeFriend(userId);
    });

    return () => {
      socket.off('friendRequest');
      socket.off('friendRequestAccepted');
      socket.off('friendRequestDeclined');
      socket.off('friendRemoved');
    };
  }, [socket, addRequest, addFriend, updateRequest, removeFriend, setFriends, setRequests]);

  const sendFriendRequest = useCallback(
    async (receiverId: string) => {
      // if (!socket) throw new Error('Not connected');
      return frienshipService?.sendFriendRequest(receiverId);
    },
    [frienshipService]
  );

  const respondToFriendRequest = useCallback(
    async (requestId: string, accept: boolean) => {
      if (!socket) throw new Error('Not connected');
      return frienshipService?.respondToFriendRequest(requestId, accept);
    },
    [socket, frienshipService]
  );

  const removeFriendship = useCallback(
    async (friendId: string) => {
      if (!socket) throw new Error('Not connected');
      return frienshipService?.removeFriend(friendId);
    },
    [socket, frienshipService]
  );

  return {
    friends,
    requests,
		pendingRequests: requests.filter(req => req.status === 'PENDING'),
    loading,
    sendFriendRequest,
    respondToFriendRequest,
    removeFriendship,
  };
}