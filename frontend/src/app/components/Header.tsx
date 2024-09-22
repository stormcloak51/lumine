import { Box, Group, Text, Title, Input } from '@mantine/core'
import LumineBlackMaterialLogo from '../../assets/icons/lumine-material-black.png'
import Image from 'next/image'
import { Search } from 'lucide-react'

export function Header() {
	return (
		<Box className='p-3 back bg-[#323539] rounded-b-2xl border border-slate-500 border-t-0'>
			<Group justify="space-between">
				<Group>
					<Image src={LumineBlackMaterialLogo} alt='Lumine logo' height={36} width={36} className='' />
					<Title className='helvetica-regular font-bold' size='28'>
						<Text size='28' fw={700} className='!leading-8' variant='gradient' gradient={{ from: '#ffd37d', to: '#ffbb38', deg: 90 }}>lumine</Text>
					</Title>
				</Group>
				<Input placeholder='Quick search' size='md' className='w-[200px] text-[14px] outline-[#ffcb64]' radius={'lg'} leftSection={<Search size={16}/>} />
				<Group>

				</Group>
			</Group>
		</Box>
	)
}
