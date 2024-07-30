<script lang="ts">
import type { Tag, TagsApiResult } from '@/types/Tag'
import type { ApiListParams } from '@/types/Common'
import { defineComponent, ref, reactive, onBeforeMount } from 'vue'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import config from '@/configs/config.json'
import { TagApi } from '@/apis'
import { RouterLink } from 'vue-router'

// Types
interface Params {
  pageToken?: string
}

export default defineComponent({
  setup() {
    const globalLoader = useGlobalLoaderStore()

    const serviceId: string = config.post.serviceId

    const tags = reactive([] as Tag[])
    let pageToken = ref<string | undefined>('')

    const setTags = async () => {
      try {
        globalLoader.updateLoading(true)
        let params: ApiListParams = {}
        if (pageToken != null) {
          params.pageToken = pageToken.value
        }
        const res = await TagApi.getList(serviceId, params)
        res.items.map((item: Tag) => {
          tags.push(item)
        })
        pageToken.value = res.pageToken
      } catch (error) {
        console.log(error)
      } finally {
        globalLoader.updateLoading(false)
      }
    }

    onBeforeMount(async () => {
      await setTags()
      console.log(11110000, tags)
    })

    return { tags }
  }
})
</script>

<template>
  <div>
    <section>
      <h5 class="text-xl font-semibold text-gray-600 dark:text-gray-300">
        {{ $t('common.tagsShort') }}
      </h5>
      <nav class="mt-4 px-2 mx-auto text-sm text-gray-500 dark:text-gray-400">
        <ul
          v-if="tags.length > 0"
          class="space-y-3"
        >
          <li
            v-for="tag in tags"
            :key="tag.label"
          >
            <RouterLink
              :to="`/tags/${tag.label}/posts`"
              class="hover:underline hover:text-blue-600 dark:hover:text-blue-500"
            >
              {{ tag.label }}
            </RouterLink>
          </li>
        </ul>
      </nav>
    </section>
  </div>
</template>
