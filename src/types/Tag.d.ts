export interface Tag {
  serviceId: string
  tagId: string
  label: string
  createdAt: string
}

export interface TagsApiResult {
  items: Tag[]
  pageToken: string
}
