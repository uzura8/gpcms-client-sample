<script lang="ts">
import type { Tag } from '@/types/Tag'
import type { ApiListParams } from '@/types/Common'
import { defineComponent, ref, reactive, onBeforeMount, computed } from 'vue'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import { TagApi } from '@/apis'

export default defineComponent({
  components: {},

  props: {
    serviceId: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const globalLoader = useGlobalLoaderStore()

    const tags = reactive([] as Tag[])
    const pageTokenTags = ref<string | undefined>('')
    const hasNextTags = computed(() => {
      return !!pageTokenTags.value
    })

    const setTags = async () => {
      try {
        globalLoader.updateLoading(true)
        let params: ApiListParams = {}
        // params.count = 3 // debug
        params.pageToken = pageTokenTags.value
        const res = await TagApi.getList(props.serviceId, params)
        res.items.map((item: Tag) => {
          tags.push(item)
        })
        pageTokenTags.value = res.pageToken
      } catch (error) {
        console.log(error)
      } finally {
        globalLoader.updateLoading(false)
      }
    }

    onBeforeMount(async () => {
      await setTags()
    })

    return {
      tags,
      hasNextTags,
      setTags
    }
  }
})
</script>

<template>
  <nav class="text-gray-500 dark:text-gray-400">
    <ul
      v-if="tags.length > 0"
      class="space-y-2"
    >
      <li
        v-for="tag in tags"
        :key="tag.label"
      >
        <RouterLink
          :to="`/tags/${tag.label}/posts`"
          class="block py-2 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
        >
          {{ tag.label }}
        </RouterLink>
      </li>
    </ul>
    <div
      v-if="hasNextTags"
      class="mt-2"
    >
      <button
        @click="setTags"
        class="text-sm text-gray-500 dark:text-gray-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
      >
        {{ $t('common.more') }}
      </button>
    </div>
  </nav>
</template>
