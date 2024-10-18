import { Card, Title, Button, Grid } from '@mantine/core'
import { UserPlus, MessageSquare, MessagesSquare } from 'lucide-react'
import { FC } from 'react'

export const ActionsSection: FC = () => {
	return (
		<Grid.Col span={7.5} className='px-0 pt-4 '>
			<Card className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] p-[16px] py-[12px]'>
				<Title order={3} className='mb-4'>
					Actions
				</Title>
				<div className='flex justify-start gap-x-4 items-center'>
					<Button
						leftSection={<UserPlus size={20} />}
						className='text-[16px] font-sans'
						color={'#ffd37d'}
						variant={'outline'}>
						Follow
					</Button>
					<Button
						className='text-[16px] font-sans'
						color={'#ffd37d'}
						variant={'outline'}
						leftSection={<MessageSquare size={20} />}>
						Write a message
					</Button>
					<Button
						className='text-[16px] font-sans'
						color={'#ffd37d'}
						variant={'outline'}
						leftSection={<MessagesSquare size={20} />}>
						Add to chat
					</Button>
				</div>
			</Card>
		</Grid.Col>
	)
}
