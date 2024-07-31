export interface ApiListParams {
  pageToken?: string
  count?: number
}

export interface ApiListResponse {
  items: any[]
  pageToken: string
}
