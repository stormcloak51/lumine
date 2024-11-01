import { Grid } from '@mantine/core'
import { UserBanner } from '@/app/components/profile/UserBanner'
import { FollowerSection } from '@/app/components/profile/FollowerSection'
import { userService } from '@/services/user.service'
import { Wrapper } from '@/app/components/profile/Wrapper'
import { Suspense } from 'react'
import Loading from './loading'

export const Profile = async ({ params }: { params: { slug: string } }) => {
	const user = await userService.getProfile(params.slug)
	// const posts = await postService.findByUsername(params.slug)
	return (
		<Suspense fallback={<Loading />}>
			<div>
				<Grid className='w-full !p-0' gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}>
					<UserBanner {...user} />
					<Wrapper currId={user?.id} title={`${user?.name}'s Posts`} username={user.username} />

					<FollowerSection userAvatar={user?.userAvatar} />
				</Grid>
			</div>
		</Suspense>
	)
}

export default Profile
