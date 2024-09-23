import { Card, Title, Group, Container, Input, Avatar } from '@mantine/core'
import { NextPage } from 'next'
import classes from '../../components/styles/Header.module.scss'

const Feed: NextPage = ({}) => {

	
	return (
		<Container className='ml-[290px] pl-[20px] box-border flex flex-col'>
			<Card className='!bg-[#1f2124] mb-[20px]' shadow='sm' withBorder radius='lg'>
				<Input
					placeholder="What's news?"
					size='md'
					variant='unstyled'
					className='w-[500px] text-[14px] outline-[#ffcb64] pl-[15px] focus:h-[300px]'
					radius={'lg'}
					leftSection={
						<Avatar size={46} src='https://i.pravatar.cc/300'>
							SC
						</Avatar>
					}
					
					classNames={classes}
				/>
			</Card>
			<Card className='!bg-[#1f2124]' shadow='sm' withBorder radius='lg'>
				<Group>
					<Title className='font-sans font-medium'>News</Title>
				</Group>
			</Card>
		</Container>
	)
}

export default Feed
