import { AvatarProps, Avatar } from '@mantine/core'
import { FC } from 'react'
import classes from './styles/Avatar.module.scss'

interface IAvatar extends AvatarProps {
	hasStories?: boolean
}

const LumineAvatar: FC<IAvatar> = ({ hasStories = false, className, ...props }) => {
	return (
		<div className={`${classes.avatarWrapper} ${hasStories ? classes.hasStories : ''} ${className || ''}`}>
			<Avatar {...props} />
		</div>
	);
}

export default LumineAvatar;