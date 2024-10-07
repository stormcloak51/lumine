'use client';
import { AvatarProps, Avatar } from '@mantine/core'
import { FC } from 'react'
import classes from './styles/Avatar.module.scss'
import Link from 'next/link'
import { useAuth } from '@/lib/actions/state'

interface IAvatar extends AvatarProps {
	hasStories?: boolean
	shouldRedirect?: boolean
	position?: 'relative' | 'absolute'
}

const LumineAvatar: FC<IAvatar> = ({ hasStories = false, className, position = 'relative', shouldRedirect = false, ...props }) => {
	const { user: {user} } = useAuth()

	if (!shouldRedirect) {
		return (
			<div className={`${classes.avatarWrapper} ${position === 'absolute' ? 'absolute top-0' : 'relative'} ${hasStories ? classes.hasStories : ''} ${className}`}>
				<Avatar {...props} src={user.userAvatar} >{user.userAvatar?.slice(0, 2)}</Avatar>
			</div>
		)
	}

	return (
		<Link href='/profile' className={`${classes.avatarWrapper} ${position === 'absolute' ? 'absolute top-0' : 'relative'} ${hasStories ? classes.hasStories : ''} ${className}`}>
			<Avatar {...props} src={user.userAvatar} >{user.userAvatar?.slice(0, 2)}</Avatar>
		</Link>
	);
}

export default LumineAvatar;