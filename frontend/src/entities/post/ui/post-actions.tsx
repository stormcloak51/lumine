import { TPost } from '@/shared/config/types/post.types'
import { Button } from '@mantine/core'
import { Forward, Heart, MessageCircle } from 'lucide-react'

import { usePost } from '../model/usePost'

interface props {
  post: TPost
  onClickComment: () => void
  commentsCount: number | undefined
}

export const PostActions = ({ post, onClickComment, commentsCount }: props) => {
  const { isLiked, handleLike } = usePost({ post })
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
      {typeof commentsCount === 'number' && commentsCount > 0 && (
        <Button
          leftSection={<MessageCircle size={18} />}
          rightSection={commentsCount}
          onClick={onClickComment}
          className="bg-[#2a2a2a] transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]"
          styles={{
            section: { margin: '0px' },
            inner: { display: 'flex', columnGap: '2px' },
          }}
        />
      )}
      <Button className="bg-[#2a2a2a] !px-3 transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]">
        <Forward size={18} />
      </Button>
    </>
  )
}
