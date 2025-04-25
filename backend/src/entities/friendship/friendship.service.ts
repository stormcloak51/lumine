import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/infrastructure/prisma/prisma.service'


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

	async getFriendsByUsername(username: string) {
		// Get the user first to get their ID
		const user = await this.prisma.user.findFirst({
			where: {
				username: {
					contains: username,
					mode: 'insensitive'
				}
			}
		});

		if (!user) {
			return []; // User not found
		}

		// Get all friendships where this user is involved
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

		// Map to a consistent structure for the frontend
		// with a single "friends" array containing all friend users
		const processedFriends = friendships.map(friendship => {
			// Identify which user in the relationship is the friend (not the searched user)
			const friendUser = friendship.userId === user.id ? friendship.friend : friendship.user;
			
			return {
				id: friendship.id,
				createdAt: friendship.createdAt,
				friend: friendUser,
				// Also include the original data for backward compatibility
				user: friendship.user,
				userId: friendship.userId,
				friendId: friendship.friendId
			};
		});

		return processedFriends;
	}

	async deleteFriend(userId: string, friendId: string) {
		await this.prisma.friendship.deleteMany({
			where: {
				OR: [
					{ userId, friendId },
					{ userId: friendId, friendId: userId }
				]
			}
		})
		await this.prisma.friendRequest.deleteMany({
			where: {
				OR: [
					{senderId: userId, receiverId: friendId},
					{senderId: friendId, receiverId: userId}
				]
			}
		})
		return {
			success: true,
			message: 'Friend deleted successfully'
		}
	}
}