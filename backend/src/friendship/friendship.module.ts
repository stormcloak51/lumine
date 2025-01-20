import { Module } from '@nestjs/common'
import { FriendshipController } from './friendship.controller'
import { FriendshipService } from './friendship.service'
import { UserService } from '../user/user.service'

@Module({
	controllers: [FriendshipController],
	providers: [FriendshipService, UserService],
	exports: [FriendshipService]
})
export class FriendshipModule {}
