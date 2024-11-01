import React, { useEffect, useState } from 'react';
import { useAuth } from '@/lib/actions/state';
import { postService } from '@/services/post.service';
import { TPost } from '@/types/post.types';
import { IUserCredentials } from '@/types/user.types';
import { Button } from '@mantine/core';
import { useMutation } from '@tanstack/react-query';
import { Forward, Heart, MessageCircle } from 'lucide-react';

interface IPostActions {
  post: TPost
  onClickComment: () => void
  commentsCount: number
}

export const PostActions = ({ post, onClickComment, commentsCount }: IPostActions) => {
  const { user } = useAuth();
  const [localCommentsCount, setLocalCommentsCount] = useState(commentsCount);
	const [localLikes, setLocalLikes] = useState(post.likes)
  const [isInitiallyLiked, setIsInitiallyLiked] = useState(post?.Like?.some(like => like.userId === user?.id) ?? false);

	useEffect(() => {
    setLocalCommentsCount(commentsCount)
		setLocalLikes(post.likes)
		setIsInitiallyLiked(post?.Like?.some(like => like.userId === user?.id) ?? false)
	}, [post, user?.id, post?.Like, commentsCount])


  const likePostMutation = useMutation({
    mutationFn: (data: { postId: number; user: IUserCredentials }) => 
      postService.like(data),
    onMutate: async ({ postId }) => {
			setLocalLikes(prev => prev + 1)
			setIsInitiallyLiked(true)
		}
  });

  const unlikePostMutation = useMutation({
    mutationFn: (data: { postId: number; user: IUserCredentials }) => 
      postService.unlike(data),
    onMutate: async ({ postId }) => {
			setLocalLikes(prev => prev - 1)
			setIsInitiallyLiked(false)
		},
  });

  const handleLike = () => {
    if (isInitiallyLiked) {
      unlikePostMutation.mutate({ postId: post.id, user });
    } else {
      likePostMutation.mutate({ postId: post.id, user });
    }
  };

  return (
    <>
      <Button
        onClick={handleLike}
        leftSection={
          <Heart
            fill={isInitiallyLiked ? '#F74440' : 'transparent'}
            stroke={isInitiallyLiked ? '#F74440' : 'white'}
            size={18}
          />
        }
        rightSection={localLikes}
        className={`bg-[#2a2a2a] transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)] ${
          
						isInitiallyLiked ? 'bg-[#1E1A1B]' : ''
        }`}
        styles={{
          section: { margin: '0px' },
          inner: { display: 'flex', columnGap: '2px' },
        }}
      />
      <Button
        leftSection={<MessageCircle size={18} />}
        rightSection={localCommentsCount}
        onClick={onClickComment}
        className="bg-[#2a2a2a] transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]"
        styles={{
          section: { margin: '0px' },
          inner: { display: 'flex', columnGap: '2px' },
        }}
      />
      <Button 
        className="bg-[#2a2a2a] !px-3 transition-all h-8 rounded-[35px] flex items-center hover:bg-[rgb(66,66,66)]"
      >
        <Forward size={18} />
      </Button>
    </>
  );
};