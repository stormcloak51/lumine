import { Box, Group, Text, Title, Input, ActionIcon } from '@mantine/core'
import LumineBlackMaterialLogo from '../../assets/icons/lumine-material-black.png'
import Image from 'next/image'
import { Bell, Search, Settings, SunMoon } from 'lucide-react'
import input from './styles/Header.module.scss'
import Link from 'next/link'
import LumineAvatar from './LumineAvatar'

export function Header() {
	return (
		<Box className='p-3 bg-[rgba(31,33,36,0.7)] rounded-b-2xl border border-[rgb(66,66,66)] border-t-0 fixed max-w-[1224px] w-[100%] z-10 backdrop-blur-md'>
			<Group justify='space-between'>
				<Group>
					<Image
						src={LumineBlackMaterialLogo}
						alt='Lumine logo'
						height={36}
						width={36}
					/>
					<Title className='inter-700 letter tracking-wide' size='28'>
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
					classNames={input}
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
					<LumineAvatar size={46} src='https://i.pravatar.cc/300'>
						SC
					</LumineAvatar>
				</Group>
			</Group>
		</Box>
	)
}
