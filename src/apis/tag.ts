import type { AxiosResponse, AxiosError } from 'axios'
import type { TagsApiResult } from '@/types/Tag'
import { client, getRequestOption } from './client'

class TagApi {
  getList(serviceId: string, params = {}, token = ''): Promise<TagsApiResult> {
    const uri = `tags/${serviceId}`
    const options = getRequestOption(uri, 'get', params, token)
    return new Promise((resolve, reject) => {
      client(options)
        .then((res: AxiosResponse<TagsApiResult>) => {
          resolve(res.data)
        })
        .catch((err: AxiosError<{ error: string }>) => {
          reject(err)
        })
    })
  }
}

export default new TagApi()
