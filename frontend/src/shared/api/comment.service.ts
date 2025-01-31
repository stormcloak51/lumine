import {
  TCommentDelete,
  TCommentEdit,
  TCommentLike,
  TCommentResponse,
  TComments,
  TCreateComment,
	TSubComment,
} from '../config/types/comment.types'
import { api } from './base'

export class CommentService {
  async getById(postId: number, page: number) {
    const response = await api.get<TComments>(
      `comment/getById?postId=${postId}&page=${page}`
    )
    return {
      data: response.data,
      total: response.total,
    }
  }

  async create(data: TCreateComment) {
    const response = await api.post<TCommentResponse>('comment/create', data)
    return response
  }

  async like(data: TCommentLike) {
    const response = await api.post<TCommentResponse>('comment/like', data)
    return response
  }

  async delete(data: TCommentDelete) {
    const response = await api.patch('comment/delete', data)
    return response
  }

  async edit(data: TCommentEdit) {
    const response = await api.patch('comment/edit', data)
    return response
  }

  // ==================== SUBCOMMENTS ===================

  async getSubcomments({
    postId,
    commentId,
    page,
  }: {
    postId: number
    commentId: number
    page: number
  }) {
    const response = await api.get<TComments>(
      `comment/getSubcomments?postId=${postId}&commentId=${commentId}&page=${page}`
    )

    return {
      data: response.data,
      total: response.total,
    }
  }

  async createSubcomment(data: Partial<TSubComment>) {
    const response = await api.post<TCommentResponse>(
      'comment/createSubcomment',
      data
    )
    return response
  }
}

export const commentService = new CommentService()
