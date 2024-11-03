import { Grid } from '@mantine/core'
import { UserBanner } from '@/components/profile/UserBanner'
import { FollowerSection } from '@/components/profile/FollowerSection'
import { userService } from '@/services/user.service'
import { Wrapper } from '@/components/profile/Wrapper'
import { Suspense } from 'react'
import Loading from './loading'

export async function generateMetadata({ params }: {params: {slug: string}}) {
  return {
    title: `${params.slug}'s Profile`,
		description: `Check out ${params.slug}'s profile and posts!`
  }
}

const Profile = async ({ params }: { params: { slug: string } }) => {
	const user = await userService.getProfile(params.slug)
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
