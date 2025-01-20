import { Controller, Get } from '@nestjs/common'
import { Authorization } from '../auth/decorators/auth.decorator'
import { CurrentUser } from '../auth/decorators/user.decorator'
import { FriendshipService } from './friendship.service'


@Controller('friendship')
export class FriendshipController {
	constructor(private readonly friendshipService: FriendshipService) {}

	@Get('friend-requests')
	@Authorization()
	getFriendRequests(@CurrentUser('id') id: string) {
		return this.friendshipService.getFriendRequests(id)
	}

	@Get('friendships')
	@Authorization()
	getFriendships(@CurrentUser('id') id: string) {
		return this.friendshipService.getFriendships(id)
	}

	@Get('friends')
	@Authorization()
	getFriends(@CurrentUser('id') id: string) {
		return this.friendshipService.getFriends(id)
	}
}
