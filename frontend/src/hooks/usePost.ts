import { axiosWithAuth } from '@/api/interceptors'
import { postService } from '@/services/post.service'
import { TPost } from '@/types/post.types'
import { IUserCredentials } from '@/types/user.types'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useState } from 'react'



export const usePost = () => {


	const queryClient = useQueryClient();
	const updatePostInCache = (post: TPost) => {
    queryClient.setQueriesData({ queryKey: ['posts'] }, (oldData) => {
      if (!oldData) return oldData;

      return {
        ...oldData,
        pages: oldData.pages.map((page: { data: TPost[] }) => ({
          ...page,
          data: page.data.map((p: TPost) => 
            p.id === post.id ? post : p
          )
        }))
      };
    });
  };

	return {
		updatePostInCache
	}
}