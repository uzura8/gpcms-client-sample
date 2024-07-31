import type { AxiosResponse, AxiosError } from 'axios'
import type { CategoryPublic, ApiListParamsCategory } from '@/types/Category'
import { client, getRequestOption } from './client'

class CategoryApi {
  getOneBySlug(
    serviceId: string,
    slug: string,
    params: ApiListParamsCategory | null = null,
    token = ''
  ): Promise<CategoryPublic> {
    const uri = `categories/${serviceId}/${slug}`
    const options = getRequestOption(uri, 'get', params, token)
    return new Promise((resolve, reject) => {
      client(options)
        .then((res: AxiosResponse<CategoryPublic>) => {
          resolve(res.data)
        })
        .catch((err: AxiosError<{ error: string }>) => {
          reject(err)
        })
    })
  }
}

export default new CategoryApi()
