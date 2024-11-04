import React from 'react'
import { TPost } from '@/types/post.types'
import { Button } from '@mantine/core'
import { Forward, Heart, MessageCircle } from 'lucide-react'
import { usePost } from '@/hooks/usePost'

interface IPostActions {
  post: TPost
  onClickComment: () => void
  commentsCount: number
}

export const PostActions = ({ post, onClickComment, commentsCount }: IPostActions) => {

  const {isLiked, handleLike} = usePost({post})

  return (
    <>
      <Button
        onClick={handleLike}
        leftSection={
          <Heart
            fill={isLiked ? '#F74440' : 'transparent'}
            stroke={isLiked ? '#F74440' : 'white'}
            size={18}
          />
        }
        rightSection={post.likes}
        className={`bg-[#2a2a2a] transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)] ${
          isLiked ? 'bg-[#1E1A1B]' : ''
        }`}
        styles={{
          section: { margin: '0px' },
          inner: { display: 'flex', columnGap: '2px' },
        }}
      />
      {post.Comment.length > 0 && (
        <Button
          leftSection={<MessageCircle size={18} />}
          rightSection={commentsCount}
          onClick={onClickComment}
          className='bg-[#2a2a2a] transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]'
          styles={{
            section: { margin: '0px' },
            inner: { display: 'flex', columnGap: '2px' },
          }}
        />
      )}
      <Button 
        className='bg-[#2a2a2a] !px-3 transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]'
      >
        <Forward size={18} />
      </Button>
    </>
  )
}