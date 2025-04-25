import { ConflictException } from '@nestjs/common'
import { ConnectedSocket, MessageBody, OnGatewayConnection, OnGatewayDisconnect, SubscribeMessage, WebSocketGateway, WebSocketServer } from '@nestjs/websockets'
import { Server, Socket } from 'socket.io'
import { AuthenticatedSocket } from 'src/infrastructure/config/types/auth.interface'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'

@WebSocketGateway({
  namespace: 'friendship',
  origin: '*',
})
export class FriendshipGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  // Track sent notifications to prevent duplicates
  private sentNotifications = new Set<string>();

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
    const userId = client.handshake.query.userId as string;

    if (!data?.receiverId) {
      console.log('something??')
      return { success: false, error: 'Receiver ID is required' };
    }

    if (!userId) {
      console.log('first')
      return { success: false, error: 'User not authenticated' };
    }

    if (userId === data.receiverId) {
      throw new ConflictException('Users cannot send friend requests to themselves');
    }

    try {
      // Проверяем, являются ли пользователи уже друзьями
      const areUsersFriends = await this.prisma.friendship.findFirst({
        where: {
          OR: [
            {userId, friendId: data.receiverId},
            {userId: data.receiverId, friendId: userId}
          ]
        }
      });

      if (areUsersFriends) {
        throw new ConflictException('Users are already friends');
      }

      // Проверяем существующий запрос
      const existingRequest = await this.prisma.friendRequest.findFirst({
        where: {
          senderId: userId,
          receiverId: data.receiverId,
          status: 'PENDING'
        }
      });

      if (existingRequest) {
        throw new ConflictException('Friend request already sent to this user');
      }

      // Создаем или обновляем запрос
      const request = await this.prisma.friendRequest.upsert({
        where: {
          senderId_receiverId: {
            senderId: userId,
            receiverId: data.receiverId
          }
        },
        create: {
          senderId: userId,
          receiverId: data.receiverId,
          status: 'PENDING'
        },
        update: {
          status: 'PENDING'
        },
        include: {
          sender: true,
        },
      });

      console.log('REQUEST', request)
      // Отправляем уведомления
      this.server.to(data.receiverId).emit('friendRequest', {
        type: 'RECEIVED',
        request,
      });
      
      client.emit('friendRequest', {
        message: 'Successfully sent friend request',
      });

      return { success: true, request };
    } catch (error) {
      console.error('Friend request error:', error);
      return { success: false, error: 'Failed to send friend request' };
    }
  }

  @SubscribeMessage("acceptFriendRequest")
  async acceptFriendRequest(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() data: { requestId: string })
  {
    const userId = client.handshake.query.userId as string
  
    console.log(userId, data.requestId)
    try {
      const friendship = await this.prisma.$transaction(async (tx) => {
        // First, find the friend request
        const friendRequest = await tx.friendRequest.findFirst({
          where: {
                receiverId: userId,
                id: data.requestId,
                status: "PENDING"
          },
        })
  
        if (!friendRequest) {
          throw new Error("Friend request not found")
        }
  
        // Update the friend request status
        await tx.friendRequest.update({
          where: { senderId_receiverId: {senderId: friendRequest.senderId, receiverId: userId} },
          data: { status: "ACCEPTED" },
        })
  
        // Create the friendship
        return await tx.friendship.create({
          data: {
            userId: userId,
            friendId: friendRequest.senderId,
          },
          include: {
            friend: true,
          },
        })
      })
  
      this.server.to(friendship.friendId).emit("friendRequestAccepted", {
        friendship,
      })
  
      client.emit("friendRequestAccepted", {
        message: "Successfully accepted friend request",
        friendship,
      })
  
      return { success: true, friendship };
    } catch (error) {
      console.error("Accept friend request error:", error)
      client.emit("friendRequestError", { message: "Failed to accept friend request" })
      return { success: false, error: 'Failed to accept friend request' };
    }
  }

  @SubscribeMessage("declineFriendRequest") 
  async declineFriendRequest(@ConnectedSocket() client: AuthenticatedSocket, @MessageBody() data: { requestId: string }) {

    const userId = client.handshake.query.userId as string;

    try {
      const request = await this.prisma.friendRequest.updateManyAndReturn({
        where: {
          id: data.requestId
        },
        data: {
          status: 'DECLINED'
        },
      })

      this.server.to(request[0].senderId).emit('friendRequest', {
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