import { UpdateUserDto } from '@/src/infrastructure/dtos/user.dto'
import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Patch,
} from '@nestjs/common'
import { Authorization } from 'src/entities/auth/decorators/auth.decorator'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly prisma: PrismaService,
  ) {}

  @Authorization('ADMIN')
  @HttpCode(HttpStatus.OK)
  @Get('all')
  findAll() {
    return this.userService.findAll();
  }

  @Get(':idOrEmailOrUsername')
  async findOne(@Param('idOrEmailOrUsername') idOrEmailOrUsername: string) {
    // Get basic user data
    const user = await this.userService.findOne(idOrEmailOrUsername);
    
    console.log(123123)
    // Find all friendships where this user is either the user or friend
    const friendships = await this.prisma.friendship.findMany({
      where: {
        OR: [
          { userId: user.id },
          { friendId: user.id }
        ]
      },
      include: {
        user: true,
        friend: true
      }
    });
  
    // Map friendships to a consistent format and get the friend's data
    const mappedFriends = friendships.map(friendship => {
      const friendData = friendship.userId === user.id 
        ? friendship.friend  // If user is the initiator, friend is the target
        : friendship.user;   // If user is the target, user is the friend
      
      return {
        id: friendship.id,
        createdAt: friendship.createdAt,
        user: friendData
      };
    });
    
    // Sort by username
    const sortedFriends = mappedFriends.sort((a, b) => 
      a.user.username.localeCompare(b.user.username)
    );
    
    // Create a clean result with only one friends array
    return {
      ...user,
      friends: sortedFriends,
      friendsOf: undefined
    };
  }

  @Authorization()
  @Patch()
  update(@CurrentUser('id') id: string, @Body() dto: UpdateUserDto) {
    return this.userService.update({ id, dto });
  }
}
