import type { AxiosResponse, AxiosError } from 'axios'
import type { ApiListResponsePostGroup } from '@/types/PostGroup'
import { client, getRequestOption } from './client'

class PostGroupApi {
  getList(serviceId: string, params = {}, token = ''): Promise<ApiListResponsePostGroup> {
    const uri = `posts/${serviceId}/groups`
    const options = getRequestOption(uri, 'get', params, token)
    return new Promise((resolve, reject) => {
      client(options)
        .then((res: AxiosResponse<ApiListResponsePostGroup>) => {
          resolve(res.data)
        })
        .catch((err: AxiosError<{ error: string }>) => {
          reject(err)
        })
    })
  }
}

export default new PostGroupApi()
