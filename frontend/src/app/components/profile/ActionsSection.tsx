import { Card, Title, Button, Grid } from '@mantine/core'
import { UserPlus, MessageSquare, MessagesSquare } from 'lucide-react'

export const ActionsSection = () => {
	return (
		<Card className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)] p-[16px] py-[12px] mb-6'>
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
	)
}
