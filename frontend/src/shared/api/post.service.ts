import { TPaginatedResponse } from '../config/types/general.types'
import { ICreatePost, IPostDraft, TPost } from '../config/types/post.types'
import { api } from './base'

export class PostService {
  async findAll(): Promise<TPost[]> {
    const response = await api.get<TPost[]>('post')

    return response
  }

  async findSortedByLikes(
    page: number = 1,
    limit: number = 10
  ): Promise<TPaginatedResponse<TPost[]>> {
    const response = await api.get<TPaginatedResponse<TPost[]>>(
      `post/sortedByLikes?page=${page}&limit=${limit}`
    )

    return response
  }

  async findAllSortedByDate(page: number = 1, limit: number = 10) {
    const response = await api.get<TPaginatedResponse<TPost>>(
      `post/sortedByDate?page=${page}&limit=${limit}`
    )

    return response
  }

  async findByUsername(username: string, page: number = 1, limit: number = 10) {
    try {
      const response = await api.get<TPaginatedResponse<TPost>>(
        `post/findByUsername?username=${username}&page=${page}&limit=${limit}`
      )
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async create(data: ICreatePost) {
    const response = await api.post<ICreatePost>('post/create', data)
    return response
  }

  async like(postId: number) {
    const response = await api.patch<TPost>('post/like', {postId})
    return response
  }

  async delete(postId: number) {
    try {
      const response = await api.delete(`post/delete/`, postId)
      return response
    } catch (error) {
      console.log(error)
    }
  }

  async edit(postId: number, content: string) {
    try {
      const response = await api.patch(`post/edit`, {
        postId,
        content,
      })
      return response
    } catch (error) {
      console.log(error)
    }
  }

  // ==================== DRAFTS ====================

  async findDraft(): Promise<IPostDraft | undefined> {
    try {
      const response = await api.get<IPostDraft>('post/getDraft')
      return response
    } catch (err) {
      console.log(err)
      return undefined
    }
  }

  async upsertDraft(data: Partial<IPostDraft> | null) {
    try {
      const response = await api.post('post/upsertDraft', data)
      return response
    } catch (err) {
      console.error(err)
      return err
    }
  }

  async deleteMediaDraft(key: string) {
    try {
      const response = await api.delete('post/deleteMediaDraft', {
        data: { key },
      })
      return response
    } catch (err) {
      console.error(err)
      return err
    }
  }
}

export const postService = new PostService()
