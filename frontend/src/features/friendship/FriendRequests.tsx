import { Popover } from '@mantine/core'
import { Bell } from 'lucide-react'
import { useFriendship } from './useFriendship'
import { useSocketStore } from '@/shared/stores/socket/socket.store'

export const FriendRequests = () => {

	const { pendingRequests, loading, respondToFriendRequest } = useFriendship();

	const isConnected = useSocketStore((state) => state.isConnected)

  return (
    <Popover
      width={320}
      shadow="md"
      withArrow
      overlayProps={{ zIndex: 20, blur: '8px' }}
      zIndex={21}
    >
      <Popover.Target>
        <Bell size={24} className="stroke-primary-200" />
      </Popover.Target>
      <Popover.Dropdown>
				{loading ? (
					<p>Loading... Status: {isConnected}</p>
				) : (
					<div>
						<h1>friend requests</h1>
						{pendingRequests.map((request) => (
							<div key={request.id}>
								<p>{request.sender.username}</p>
								<button onClick={() => respondToFriendRequest(request.id, true)}>
									Accept
								</button>
								<button onClick={() => respondToFriendRequest(request.id, false)}>
									Decline
								</button>
							</div>
						))}
					</div>
				)}

			</Popover.Dropdown>
    </Popover>
  )
}
