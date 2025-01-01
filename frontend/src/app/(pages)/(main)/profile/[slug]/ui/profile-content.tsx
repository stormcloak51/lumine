import { IUser } from '@/shared/config/types/user.types'
import { Grid } from '@mantine/core'

import { FollowerSection } from './follower-section'
import { UserBanner } from './user-banner'
import { Wrapper } from './wrapper'

export const ProfileContent = async ({
  user,
  params,
}: {
  user: IUser
  params: { slug: string }
}) => {
  return (
    <Grid
      className="w-full !p-0"
      gutter={{ xs: 0, sm: 0, md: 0, lg: 0, xl: 0 }}
    >
      <UserBanner {...user} />
      <Wrapper slug={params.slug} />

      <FollowerSection userAvatar={user?.userAvatar} />
    </Grid>
  )
}
