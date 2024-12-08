import { Card, Skeleton } from '@mantine/core'

export const Loading = () => {
	return (
		<Card
			className='!bg-[#1f2124] rounded-[1rem] border border-[rgb(66,66,66)] mb-[20px] p-[16px] flex flex-row items-center gap-x-5'
			withBorder
			shadow='sm'>
			<div className='w-full'>
				<Skeleton height={8} width={'100%'} radius='xl' mt={6} />
				<Skeleton height={8} width={'50%'} radius='lg' mt={6} />
			</div>
			<div className='flex flex-row gap-x-4'>
				<Skeleton height={22} width={22} />
				<Skeleton height={22} width={22} />
			</div>
		</Card>
	)
}
