import type { ApiListResponse } from './Common'

export interface PostGroupPublic {
  slug: string
  serviceId: string
  postIds: string[]
  label: string
  createdAt: string
  updatedAt: string
}

export interface ApiListResponsePostGroup extends ApiListResponse {
  items: PostGroupPublic[]
}
