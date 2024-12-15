import { Grid } from '@mantine/core'
import { UserBanner } from './user-banner'
import { userApi } from '@/shared/api/userApi'
import { FollowerSection } from './follower-section'
import { postApi } from '@/shared/api/postApi'
import { Wrapper } from './wrapper'

export const ProfileContent = async ({params}: {params: {slug: string}}) => {
	const user = await userApi.getProfile(params.slug)
	const posts = await postApi.findByUsername(user.username, 1, 10)
	return (
		<Grid
			className='w-full !p-0'
			gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
		>
			<UserBanner {...user} />
			<Wrapper
				data={posts}
			/>

			<FollowerSection userAvatar={user?.userAvatar} />
		</Grid>
	)
}
