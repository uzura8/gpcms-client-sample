import type { AxiosResponse, AxiosError } from 'axios'
import type { CommentPublic, CommentsApiResult, CommentFormValues } from '@/types/Comment'
import { client, getRequestOption } from './client'

class CommentApi {
  getList(
    serviceId: string,
    contentId: string,
    params = {},
    token = ''
  ): Promise<CommentsApiResult> {
    const uri = `comments/${serviceId}/${contentId}`
    const options = getRequestOption(uri, 'get', params, token)
    return new Promise((resolve, reject) => {
      client(options)
        .then((res: AxiosResponse<CommentsApiResult>) => {
          resolve(res.data)
        })
        .catch((err: AxiosError<{ error: string }>) => {
          reject(err)
        })
    })
  }

  create(
    serviceId: string,
    contentId: string,
    vals: CommentFormValues,
    token: string | null = null
  ): Promise<CommentPublic> {
    const uri = `comments/${serviceId}/${contentId}`
    const options = getRequestOption(uri, 'post', null, token)
    return new Promise((resolve, reject) => {
      client
        .post(uri, vals, options)
        .then((res) => resolve(res.data))
        .catch((err) => reject(err))
    })
  }
}

export default new CommentApi()
