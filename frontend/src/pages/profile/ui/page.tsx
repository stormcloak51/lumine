
import { Suspense } from 'react'
import Loading from './loading'
import { ProfileContent } from './profile-content'

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

export const Profile = async ({ params }: { params: { slug: string } }) => {
	return (
		<Suspense fallback={<Loading />}>
			<ProfileContent params={params}/>
		</Suspense>
	)
}
