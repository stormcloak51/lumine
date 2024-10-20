import { Grid } from '@mantine/core'
import PostList from '@/app/components/Posts/PostList'
import { UserBanner } from '@/app/components/profile/UserBanner'
import { FollowerSection } from '@/app/components/profile/FollowerSection'
import { userService } from '@/services/user.service'
import { postService } from '@/services/post.service'
import { Wrapper } from '@/app/components/profile/Wrapper'

export async function generateStaticParams() {
	const users = await userService.getAllUsers()
	return users.map(user => ({
		slug: user.username,
	}))
}

export const Profile = async ({ params }: { params: { slug: string } }) => {
	const user = await userService.getProfile(params.slug)
	const posts = await postService.findByUsername(params.slug)
	return (
		<div>
			<Grid className='w-full !p-0' gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}>
				<UserBanner {...user} />
				<Wrapper currId={user?.id} title={`${user?.name}'s Posts`} posts={posts} isGrid={true} />

				<FollowerSection userAvatar={user?.userAvatar} />
			</Grid>
		</div>
	)
}

export default Profile
