import { Injectable } from '@nestjs/common'
import { PrismaService } from '../prisma/prisma.service'


@Injectable()
export class FriendshipService {
	constructor(private readonly prisma: PrismaService) {}

	async getFriendRequests(userId: string) {
		return await this.prisma.friendRequest.findMany({
			where: {
				receiverId: userId,
				status: 'PENDING'
			},
			include: {
				sender: true,
			}
		})
	}

	async getFriendships(userId: string) {
		return await this.prisma.friendship.findMany({
			where: {
				OR: [
					{ userId },
					{ friendId: userId }
				]
			},
		})
	}

	async getFriends(userId: string) {
		const friendships = await this.prisma.friendship.findMany({
			where: {
				OR: [
				{ userId },
				{ friendId: userId }]
			},
			include: {
				user: true,
				friend: true
			}
		})
		return friendships.map(f => f.userId === userId ? f.friend : f.user)
	}
}