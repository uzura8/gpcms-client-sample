import type { ApiListResponse } from './Common'
import type { PostPublic } from './Post'

export interface PostGroupPublic {
  slug: string
  serviceId: string
  postIds: string[]
  posts: PostPublic[]
  label: string
  createdAt: string
  updatedAt: string
}

export interface ApiListResponsePostGroup extends ApiListResponse {
  items: PostGroupPublic[]
}
