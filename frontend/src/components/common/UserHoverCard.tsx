import { HoverCard, Title, ActionIcon, Blockquote, Text, useMantineTheme } from '@mantine/core'
import { UserPlus, MessagesSquare, Quote } from 'lucide-react'
import LumineAvatar from './LumineAvatar'
import Link from 'next/link'
import { TPost } from '@/types/post.types'


interface props {
	post: TPost
}

export const UserHoverCard = ({post}: props) => {
	const theme = useMantineTheme()

	return (
		<HoverCard shadow='xl' openDelay={700}>
		<HoverCard.Target>
			<Text
				href={`/profile/${post.User.username}`}
				component={Link}
				className='hover:underline cursor-pointer'
				ml={-8}
				size='lg'
				fw={700}
			>
				{post.User.name} {post.User.surname}
			</Text>
		</HoverCard.Target>
		<HoverCard.Dropdown
			className='flex flex-row gap-x-4 rounded-xl'
			style={{
				border: '1px solid rgba(255, 200, 100, 0.15)',
				backgroundColor: 'rgba(31, 33, 36, 0.8)',
				backdropFilter: 'blur(6px)',
				boxShadow: '0 0 15px rgba(255, 184, 56, 0.1)',
			}}
		>
			<LumineAvatar
				size={50}
				url={post.User.userAvatar}
				username={post.User.username}
			/>
			<div className=''>
				<div className='flex justify-between'>
					<div>
						<Title order={3}>
							{post.User.name} {post.User.surname}
						</Title>
						<Title mb={20} c='dimmed' order={4}>
							@{post.User.username}
						</Title>
					</div>
					<div className='flex flex-row gap-x-2'>
						<ActionIcon
							color={theme.colors.myColor[0]}
							variant='outline'
						>
							<UserPlus size={20} />
						</ActionIcon>
						<ActionIcon
							color={theme.colors.myColor[0]}
							variant='outline'
						>
							<MessagesSquare size={20} />
						</ActionIcon>
					</div>
				</div>
				<Blockquote
					maw={400}
					color={'#ffd37d'}
					iconSize={30}
					icon={<Quote size={16} />}
					className='pt-3 pl-5 whitespace-normal break-words'
					cite={post.User.name + ' ' + post.User.surname}
					styles={{
						icon: {
							border: '1px solid #ffd37d',
						},
					}}
				>
					<i>
						{post.User.bio === ''
							? 'No bio yet :( lorem15123123lkawmdkjaskjdaklsdmalkdsmalksdmalkdsmalksdm msdlkm askldma klsda lksdmal sdma'
							: post.User.bio}
					</i>
				</Blockquote>
			</div>
		</HoverCard.Dropdown>
	</HoverCard>
	)
}