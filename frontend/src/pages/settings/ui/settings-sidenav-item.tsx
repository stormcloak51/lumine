import { Button } from '@mantine/core'
import { LucideProps } from 'lucide-react'
import Link from 'next/link'
import { ForwardRefExoticComponent, RefAttributes } from 'react'
import { IconType } from 'react-icons/lib'


interface props {
	Icon: ForwardRefExoticComponent<
		Omit<LucideProps, 'ref'> & RefAttributes<SVGSVGElement>
	> | IconType
	c: string
	title: string
	isActive: boolean
	setActive: () => void
}

export const SettingsSidenavItem = ({Icon, c, title, isActive, setActive}: props) => {


	return (
		<Button href={`/settings/${title.toLocaleLowerCase()}`} component={Link} onClick={() => {
			if (!isActive) setActive()
		}} classNames={{
			// inner: '!py-4',
			root: 'h-10 !px-2 w-[200px]'
		}} className={`text-zinc-400 text-[14px] tracking-wide hover:bg-[#181818] hover:text-zinc-300 flex transition-all ${isActive && 'bg-[#181818] text-zinc-300'}`} variant='subtle' leftSection={<div className='p-1 rounded-lg' style={{backgroundColor: `${c}`}}><Icon fill='#ffffff' size={18} /></div>}>
			{title}
		</Button>
	)
}