import { Grid } from '@mantine/core'
import PostList from '@/app/components/Posts/PostList'
import PostCreate from '@/app/components/Posts/PostCreate'
import { getPostByQuery } from '@/lib/actions/posts'
import { UserBanner } from '@/app/components/profile/UserBanner'
import { getAllUsers, getUser } from '@/lib/actions/api'
import { FollowerSection } from '@/app/components/profile/FollowerSection'
import { cookies } from 'next/headers'

export async function generateStaticParams() {
	const data = await getAllUsers()
	return data?.map(user => {
		return { slug: user.username }
	})
}

export const Profile = async ({ params }: { params: { slug: string } }) => {
	const user = await getUser(params.slug)
	const token = cookies().get('token')?.value
	const posts = (await getPostByQuery(params.slug, token!))?.reverse()
	return (
		<div>
			<Grid className='w-full !p-0' gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}>
				<UserBanner user={user}/>
				<PostCreate isGrid={true} />
				<FollowerSection userAvatar={user?.userAvatar}/>
				<PostList title={`${user?.name}'s Posts`} posts={posts} isGrid={true}/>
			</Grid>
		</div>
	)
}

export default Profile
