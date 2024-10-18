import { Grid } from '@mantine/core'
import PostList from '@/app/components/Posts/PostList'
import PostCreate from '@/app/components/Posts/PostCreate'
import { UserBanner } from '@/app/components/profile/UserBanner'
import { FollowerSection } from '@/app/components/profile/FollowerSection'
import { cookies } from 'next/headers'
import { userService } from '@/services/user.service'
import { postService } from '@/services/post.service'

export async function generateStaticParams() {
	const users = await userService.getAllUsers()
	return users.map((user) => ({
		slug: user.username,
	}))
}

export const Profile = async ({ params }: { params: { slug: string } }) => {
	const user = await userService.getProfile(params.slug)
	// const token = cookies().get('accessToken')?.value
	const posts = await postService.findByUsername(params.slug)
	return (
		<div>
			<Grid className='w-full !p-0' gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}>
				<UserBanner {...user} />
				<PostCreate isGrid={true} currId={user.id}/>
				<FollowerSection userAvatar={user?.userAvatar}/>
				{/* <PostList title={`${user?.name}'s Posts`} posts={posts} isGrid={true}/> */}
				
			</Grid>
		</div>
	)
}

export default Profile
