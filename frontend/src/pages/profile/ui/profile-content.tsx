import { Grid } from '@mantine/core'
import { UserBanner } from './user-banner'
import { Wrapper } from './wrapper'
import { userApi } from '@/shared/api/userApi'
import { FollowerSection } from './follower-section'

export const ProfileContent = async ({params}: {params: {slug: string}}) => {
	const user = await userApi.getProfile(params.slug)

	return (
		<Grid
			className='w-full !p-0'
			gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
		>
			<UserBanner {...user} />
			<Wrapper
				currId={user?.id}
				title={`${user?.name}'s Posts`}
				username={user.username}
			/>

			<FollowerSection userAvatar={user?.userAvatar} />
		</Grid>
	)
}
