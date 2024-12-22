import Image from 'next/image'
import logotype from '@/public/assets/icons/Obsidian.svg'

interface props extends React.ImgHTMLAttributes<HTMLImageElement> {
	src?: string
	w?: number
	h?: number
	cl?: string
}

export const LumineLogotype = ({src = logotype, w = 36, h = 36, cl = ''}: props) => {


	return (
		<Image className={cl} width={w} height={h} src={src} alt='logotype' priority/>
	)
}