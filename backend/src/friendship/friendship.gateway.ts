import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { UseGuards } from '@nestjs/common';
import { WsAuthGuard } from '@/src/auth/guards/ws-auth.guard';
import { AuthenticatedSocket } from '../config/types/auth.interface'

@WebSocketGateway({
  cors: {
    origin: process.env.ORIGIN, 
  },
})
@UseGuards(WsAuthGuard)
export class FriendshipGateway {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: PrismaService) {}

  @SubscribeMessage('sendFriendRequest')
  async handleFriendRequest(
    @ConnectedSocket() client: AuthenticatedSocket,
    { receiverId }: { receiverId: string }
  ) {
    const senderId = client.data.user.id;

    try {
      const request = await this.prisma.friendRequest.create({
        data: {
          senderId,
          receiverId,
          status: 'PENDING',
        },
        include: {
          sender: true,
        },
      });

      // send friend request to receiver
      this.server.to(receiverId).emit('friendRequest', {
        type: 'RECEIVED',
        request,
      });

      return { success: true, request };
    } catch (error) {
      return { success: false, error: 'Failed to send friend request' };
    }
  }

  @SubscribeMessage('respondToFriendRequest')
  async handleFriendResponse(
    @ConnectedSocket() socket: Socket,
    { requestId, accept }: { requestId: string; accept: boolean }
  ) {
    const userId = socket.data.user.id;

    try {
      const request = await this.prisma.friendRequest.findUnique({
        where: { senderId_receiverId: { senderId: userId, receiverId: requestId } },
        include: { sender: true, receiver: true },
      });

      if (!request || request.receiverId !== userId) {
        throw new Error('Invalid request');
      }

      if (accept) {
        // create friendship
        await this.prisma.$transaction([
          this.prisma.friendship.create({
            data: {
              userId: request.senderId,
              friendId: request.receiverId,
            },
          }),
          this.prisma.friendship.create({
            data: {
              userId: request.receiverId,
              friendId: request.senderId,
            },
          }),
          this.prisma.friendRequest.update({
            where: {     senderId_receiverId: {
							senderId: request.senderId,
							receiverId: request.receiverId,
						}, },
            data: { status: 'ACCEPTED' },
          }),
        ]);

        // notify both users
        this.server.to(request.senderId).emit('friendRequestAccepted', {
          friend: request.receiver,
        });
        this.server.to(request.receiverId).emit('friendRequestAccepted', {
          friend: request.sender,
        });
      } else {
        await this.prisma.friendRequest.update({
          where: { senderId_receiverId: { senderId: request.senderId, receiverId: request.receiverId } },
          data: { status: 'DECLINED' },
        });

        this.server.to(request.senderId).emit('friendRequestDeclined', {
          requestId,
        });
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to process friend request' };
    }
  }

  @SubscribeMessage('removeFriend')
  async handleRemoveFriend(
    @ConnectedSocket() socket: Socket,
    { friendId }: { friendId: string }
  ) {
    const userId = socket.data.user.id;

    try {
      // delete friendship
      await this.prisma.$transaction([
        this.prisma.friendship.deleteMany({
          where: {
            OR: [
              { userId, friendId },
              { userId: friendId, friendId: userId },
            ],
          },
        }),
      ]);

      // Уведомляем обоих пользователей
      this.server.to(friendId).emit('friendRemoved', { userId });
      this.server.to(userId).emit('friendRemoved', { userId: friendId });

      return { success: true };
    } catch (error) {
      return { success: false, error: 'Failed to remove friend' };
    }
  }
}