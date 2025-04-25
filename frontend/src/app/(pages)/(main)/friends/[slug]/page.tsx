import UserFriendsPage from './UserFriendsPage'

export default function FriendsPage({ params }: { params: { slug: string } }) {
  const { slug } = params
  return <UserFriendsPage slug={slug} />
}
