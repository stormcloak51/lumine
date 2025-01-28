// src/friendship/friendship.gateway.ts
import { WebSocketGateway, WebSocketServer, SubscribeMessage, ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect } from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { PrismaService } from '../prisma/prisma.service';
import { AuthenticatedSocket } from '../config/types/auth.interface';
import { UseGuards } from '@nestjs/common';

@WebSocketGateway({
  namespace: 'friendship',
  origin: '*',
})
export class FriendshipGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  constructor(private prisma: PrismaService) {}

  handleConnection(client: Socket) {

    const userId = client.handshake.query.userId as string;
    if (userId) {
      client.join(userId);
    }

    this.server.emit('user-joined', {
      message: `User ${client.id} joined the friendship namespace`,
    })
  }

  handleDisconnect(client: Socket) {


    client.leave(client.handshake.query.userId as string);
    this.server.emit('user-left', {
      message: `User ${client.id} left the friendship namespace`,
    })
  }



  @SubscribeMessage('sendFriendRequest')
  async handleFriendRequest(
    @ConnectedSocket() client: AuthenticatedSocket,
    @MessageBody() data: { receiverId: string }
  ) {
    const userId = client.handshake.query.userId as string

    if (!data?.receiverId) {
      return { success: false, error: 'Receiver ID is required' };
    }

    if (!userId) {
      return { success: false, error: 'User not authenticated' };
    }

    try {
      const request = await this.prisma.friendRequest.create({
        data: {
          senderId: userId,
          receiverId: data.receiverId,
          status: 'PENDING',
        },
        include: {
          sender: true,
        },
      });

      this.server.to(data.receiverId).emit('friendRequest', {
        type: 'RECEIVED',
        request,
      });
      client.emit('friendRequest', {
        message: 'Successfully sent friend request',
      })

      return { success: true, request };
    } catch (error) {
      console.error('Friend request error:', error);
      return { success: false, error: 'Failed to send friend request' };
    }
  }

  @SubscribeMessage("acceptFriendRequest")
  async acceptFriendRequest(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() data: { requestId: string }) {

    const userId = client.handshake.query.userId as string;

    try {
      const friendship = await this.prisma.$transaction(async (tx) => {
        await tx.friendRequest.update({
          where: {
            senderId_receiverId: {
              senderId: data.requestId,
              receiverId: userId
            },
          },
          data: {
            status: 'ACCEPTED'
          }
        })

        await tx.friendship.create({
          data: {
            userId: userId,
            friendId: data.requestId
          }
        })
      })

      this.server.to(data.requestId).emit('friendRequestAccepted', {
        friendship
      })

      client.emit('friendRequestAccepted', {
        message: 'Successfully accepted friend request',
        friendship,
      })

    } catch (error) {
      console.error('Accept friend request error:', error);
      return { success: false, error: 'Failed to accept friend request' };
    }
  }

  @SubscribeMessage("declineFriendRequest") 
  async declineFriendRequest(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() data: { requestId: string }) {

    const userId = client.handshake.query.userId as string;

    try {
      const request = await this.prisma.friendRequest.update({
        where: {
          senderId_receiverId: {
            senderId: userId,
            receiverId: data.requestId
          }
        },
        data: {
          status: 'DECLINED'
        }
      })

      this.server.to(data.requestId).emit('friendRequest', {
        type: 'DECLINED',
        request
      })

      client.emit('friendRequest', {
        message: 'Successfully declined friend request'
      })

      return { success: true, request }
    } catch (error) {
      console.error('Decline friend request error:', error);
      return { success: false, error: 'Failed to decline friend request' };
    }
  }
}