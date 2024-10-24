import { Card, Container, Flex, Skeleton } from '@mantine/core'

export default function Loading() {
	return (
		<Container p={0} className='box-border flex flex-col'>
			<Flex direction={'column'} className='gap-y-4'>
				<Card
					className='flex flex-row justify-between items-center !bg-[#1f2124] border border-[rgb(66,66,66)]'
					withBorder
					shadow='sm'
					radius={'1rem'}
				>
					<div className='flex justify-start items-center gap-x-4'>
						<Skeleton height={36} width={36} circle />
						<Skeleton height={16} width={120} radius='md' />
					</div>
					<Skeleton height={28} width={28} radius={'sm'}/>
				</Card>
				{[1, 2, 3, 4].map(index => (
					<Card
						key={index}
						className='!bg-[#1f2124] rounded-lg border border-[rgb(66,66,66)]'
						withBorder
						shadow='sm'
						radius='md'
					>
						{/* Header section with avatar and user info */}
						<div className='flex justify-start items-center'>
							<div className='flex flex-row gap-x-4 items-center'>
								{/* Avatar */}
								<Skeleton height={40} circle />

								{/* Username and time */}
								<div className='flex flex-row items-center gap-x-4'>
									<Skeleton height={20} width={120} radius='md' />
									<Skeleton height={8} circle />
									<Skeleton height={16} width={80} radius='md' />
								</div>
							</div>
						</div>

						{/* Post content */}
						<div className='mt-4'>
							<Skeleton height={8} radius='xl' mt={6} />
							<Skeleton height={8} radius='xl' mt={6} />
							<Skeleton height={8} width='70%' radius='xl' mt={6} />
						</div>
					</Card>
				))}
			</Flex>
		</Container>
	)
}
