import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common'
import { Authorization } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { ChatService } from './chat.service'

@Controller('chat')
@Authorization()
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get()
  async getChats(@CurrentUser('id') userId: string, @Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.chatService.getChats(userId, page, limit)
  }

  @Post('create')
  async createChat(@CurrentUser('id') userId: string, @Body('friendId') friendId: string ) {
    return this.chatService.createChat(userId, friendId)
  }

  @Get(':chatId/messages')
  async getChatMessages(@Param('chatId') chatId: string, @Query('page') page: number = 1, @Query('limit') limit: number = 20) {
    return this.chatService.getChatMessages(chatId, page, limit)
  }
  
  @Get(':chatId/unread')
  async getUnreadMessagesCount(@Param('chatId') chatId: string, @CurrentUser('id') userId: string) {
    return {
      count: await this.chatService.getUnreadMessagesCount(chatId, userId)
    }
  }
  
  @Get(':chatId/last-read')
  async getLastReadMessageInfo(@Param('chatId') chatId: string, @CurrentUser('id') userId: string) {
    return await this.chatService.getLastReadMessageInfo(chatId, userId);
  }
  
  @Post(':chatId/mark-read')
  async markMessageAsRead(
    @Param('chatId') chatId: string, 
    @CurrentUser('id') userId: string,
    @Body('messageId') messageId: number,
    @Body('page') page: number = 1
  ) {
    return this.chatService.markMessageAsRead(chatId, userId, messageId, page)
  }
}