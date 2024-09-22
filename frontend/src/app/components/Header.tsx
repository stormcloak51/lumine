import { Box, Group, Text, Title, Input, ActionIcon } from '@mantine/core'
import LumineBlackMaterialLogo from '../../assets/icons/lumine-material-black.png'
import Image from 'next/image'
import { Bell, Search, Settings, SunMoon } from 'lucide-react'
import classes from './styles/Header.module.scss'
import Link from 'next/link'

export function Header() {
	return (
		<Box className='p-3 back bg-[#323539] rounded-b-2xl border border-slate-500 border-t-0 fixed max-w-[1224px] w-[100%]'>
			<Group justify='space-between'>
				<Group>
					<Image
						src={LumineBlackMaterialLogo}
						alt='Lumine logo'
						height={36}
						width={36}
					/>
					<Title className='helvetica-regular font-bold' size='28'>
						<Text
							size='28'
							fw={700}
							className='!leading-8'
							variant='gradient'
							gradient={{ from: '#ffd37d', to: '#ffbb38', deg: 90 }}>
							lumine
						</Text>
					</Title>
				</Group>
				<Input
					placeholder='Quick search'
					size='md'
					className='w-[200px] text-[14px] outline-[#ffcb64]'
					radius={'lg'}
					leftSection={<Search size={16} />}
					classNames={classes}
				/>
				<Group>
					<ActionIcon
						size={36}
						variant='filled'
						color='#ffd37d'
						aria-label='Customize'
						radius={'md'}>
						<Link href={'/settings/theme'}>
							<SunMoon size={24} stroke='black' fill='black' />
						</Link>
					</ActionIcon>
					<ActionIcon
						size={36}
						variant='filled'
						color='#ffd37d'
						aria-label='Settings'
						radius={'md'}>
						<Link href={'/settings/'}>
							<Settings size={24} stroke='black' />
						</Link>
					</ActionIcon>
					<ActionIcon
						size={36}
						variant='filled'
						color='#ffd37d'
						aria-label='Notifications'
						radius={'md'}>
							<Bell size={24} stroke='black' />
					</ActionIcon>
				</Group>
			</Group>
		</Box>
	)
}
