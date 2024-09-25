import { AvatarProps, Avatar } from '@mantine/core'
import { FC } from 'react'
import classes from './styles/Avatar.module.scss'
import Link from 'next/link'

interface IAvatar extends AvatarProps {
	hasStories?: boolean
	position?: 'relative' | 'absolute'
}

const LumineAvatar: FC<IAvatar> = ({ hasStories = false, className, position = 'relative', ...props }) => {
	return (
		<Link href='/profile' className={`${classes.avatarWrapper} ${position === 'absolute' ? 'absolute top-0' : 'relative'} ${hasStories ? classes.hasStories : ''} ${className}`}>
			<Avatar {...props}/>
		</Link>
	);
}

export default LumineAvatar;