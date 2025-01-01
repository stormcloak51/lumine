import { userService } from '@/shared/api/user.service'
import { Suspense } from 'react'

import Loading from './loading'
import { ProfileContent } from './ui/profile-content'

export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  return {
    title: `${params.slug}'s Profile`,
    description: `Check out ${params.slug}'s profile and posts!`,
  }
}

export default async function Profile({
  params,
}: {
  params: { slug: string }
}) {
  // const user = await userService.getProfile(params.slug)

  return (
    <Suspense fallback={<Loading />}>
      <ProfileContent
        user={await userService.getProfile(params.slug)}
        params={params}
      />
    </Suspense>
  )
}
