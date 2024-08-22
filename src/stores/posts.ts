import type { PostPublic, PostsApiResult } from '@/types/Post'
import { ref } from 'vue'
import { defineStore } from 'pinia'
import { isEqualObjs } from '@/utils/obj'

export interface PostsCondition {
  serviceId: string
  type: 'category' | 'tag' | 'group' | ''
  value: string
}

export const usePostsStore = defineStore('posts', () => {
  const posts = ref<PostPublic[]>([])
  const pageToken = ref<string | null>(null)
  const condition = ref<PostsCondition | null>(null)

  const clearList = () => {
    posts.value = []
    pageToken.value = null
    condition.value = null
  }

  const setApiResult = (apiResult: PostsApiResult, conditionObj: PostsCondition) => {
    apiResult.items.map((item: PostPublic) => {
      posts.value.push(item)
    })
    pageToken.value = apiResult.pageToken || null
    condition.value = conditionObj
  }

  const checkConditionChanged = (conditionObj: PostsCondition): boolean => {
    return !isEqualObjs(condition.value, conditionObj)
  }

  return { posts, pageToken, clearList, setApiResult, checkConditionChanged }
})
