'use client'

import { Avatar, AvatarProps } from '@mantine/core'
import Link from 'next/link'
import { FC } from 'react'

import classes from './styles/Avatar.module.scss'

interface IAvatar extends AvatarProps {
  hasStories?: boolean
  shouldRedirect?: boolean
  position?: 'relative' | 'absolute'
  url: string | null
  username: string
}

const LumineAvatar: FC<IAvatar> = ({
  hasStories = false,
  className,
  position = 'relative',
  shouldRedirect = false,
  url,
  username,
  ...props
}) => {
  if (!shouldRedirect) {
    return (
      <div
        className={`cursor-pointer ${classes.avatarWrapper} ${
          position === 'absolute' ? 'absolute top-0' : 'relative'
        } ${hasStories ? classes.hasStories : ''} ${className}`}
      >
        <Avatar
          className={hasStories ? '' : 'border border-[rgb(66,66,66)]'}
          {...props}
          src={url}
        >
          {username?.slice(0, 2)}
        </Avatar>
      </div>
    )
  }

  return (
    <Link
      href="/profile"
      className={`${classes.avatarWrapper} ${
        position === 'absolute' ? 'absolute top-0' : 'relative'
      } ${hasStories ? classes.hasStories : ''} ${className}`}
    >
      <Avatar className="object-cover" {...props} src={url}>
        {username?.slice(0, 2)}
      </Avatar>
    </Link>
  )
}

export default LumineAvatar
