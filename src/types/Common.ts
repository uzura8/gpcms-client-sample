export interface BasicObj {
  [key: string]: any
}

export interface ApiListParams {
  pageToken?: string
  count?: number
  order?: string
}

export interface ApiListResponse {
  items: any[]
  pageToken: string
}

export type OgType =
  | 'article'
  | 'website'
  | 'book'
  | 'profile'
  | 'music.song'
  | 'music.album'
  | 'music.playlist'
  | 'music.radio_status'
  | 'video.movie'
  | 'video.episode'
  | 'video.tv_show'
  | 'video.other'
  | null
  | undefined

export type TwitterCard = 'summary' | 'summary_large_image' | 'app' | 'player' | null | undefined

export interface HeadMetaInput {
  title?: string
  urlPath?: string
  description?: string | null | undefined
  imageUrl?: string | null | undefined
  type?: OgType
}

export interface HeadMeta {
  title: string
  description?: string | null | undefined
  ogDescription?: string | null | undefined
  ogTitle?: string | null | undefined
  ogImage?: string | null | undefined
  ogSiteName?: string | null | undefined
  ogUrl?: string | null | undefined
  ogType?: OgType
  twitterCard?: TwitterCard
}
