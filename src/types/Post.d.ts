import type { CategoryPublic } from './Category'

export interface PostFile {
  fileId: string,
  mimeType: string,
  caption: string,
}

export interface PostLink {
  url: string,
  label: string,
}

//type PostStatus = 'unpublish' | 'publish' | 'hidden'
type BodyFormat = 'html' | 'text' | 'markdown'

export interface PostPublic {
  postId: string,
  slug: string,
  serviceId: string,
  title: string,
  bodyFormat: BodyFormat,
  body: string,
  bodyHtml: string,
  bodyText: string,
  createdAt: string,
  publishAt: string,
  updatedAt: string,
  statusPublishAt: string,
  categorySlug: string,
  category: CategoryPublic,
  images: PostFile[],
  files: PostFile[],
  links: PostLink[],
}

export interface PagerKey {
  postId: string,
  serviceId: string,
  statusPublishAt: string,
}