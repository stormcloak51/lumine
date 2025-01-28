import { Module } from '@nestjs/common'
import { FriendshipController } from './friendship.controller'
import { FriendshipService } from './friendship.service'
import { UserService } from '../user/user.service'
import { FriendshipGateway } from './friendship.gateway'

@Module({
	controllers: [FriendshipController],
	providers: [FriendshipService, UserService, FriendshipGateway],
	exports: [FriendshipService]
})
export class FriendshipModule {}
