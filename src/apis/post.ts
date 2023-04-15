import type { AxiosResponse, AxiosError } from 'axios'
import { client, getRequestOption } from './client'
import type { PostPublic } from '@/types/Post'

class PostApi {
  getList(serviceId: string, params = {}, token = ''): Promise<any> {
    const uri = `posts/${serviceId}`
    const options = getRequestOption(uri, 'get', params, token)
    return new Promise((resolve, reject) => {
      client(options)
        .then((res: AxiosResponse<PostPublic[]>) => {
          resolve(res.data)
        })
        .catch((err: AxiosError<{ error: string }>) => {
          reject(err)
        })
    })
  }

  getOne(serviceId: string, slug = '', params = {}, token = ''): Promise<any> {
    const uri = `posts/${serviceId}/${slug}`
    const options = getRequestOption(uri, 'get', params, token)
    return new Promise((resolve, reject) => {
      client(options)
        .then((res: AxiosResponse<PostPublic>) => {
          resolve(res.data)
        })
        .catch((err: AxiosError<{ error: string }>) => {
          reject(err)
        })
    })
  }
}

export default new PostApi()
