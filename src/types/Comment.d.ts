type PublishStatus = 'unpublish' | 'publish' | 'unconfirm'
type BodyFormat = 'html' | 'text' | 'markdown'

export interface CommentPublic {
  commentId: string
  serviceId: string
  contentId: string
  body: string
  createdAt: string
  updatedAt: string
  statusCreatedAt: string
  profiles?: {
    [key: string]: string
  }
}

export interface Comment extends CommentPublic {
  ip: string
  ua: string
}

export interface PagerKey {
  commentId: string
  serviceId: string
  statusCreatedAt: string
}

export interface CommentsApiResult {
  items: CommentPublic[]
  pagerKey?: PagerKey
  pageToken?: string
  meta?: {
    count: number
  }
}

export interface CommentFormValues {
  body: string
  profiles?: {
    age?: string
    area?: string
    nickname?: string
  }
}
