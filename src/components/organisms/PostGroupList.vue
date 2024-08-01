<script lang="ts">
import type { PostGroupPublic } from '@/types/PostGroup'
import type { ApiListParams } from '@/types/Common'
import { defineComponent, ref, reactive, onBeforeMount, computed } from 'vue'
import { RouterLink } from 'vue-router'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import { PostGroupApi } from '@/apis'

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

    const postGroups = reactive([] as PostGroupPublic[])
    const pageToken = ref<string | undefined>('')
    const hasNext = computed(() => {
      return !!pageToken.value
    })

    const setPostGroups = async () => {
      try {
        globalLoader.updateLoading(true)
        let params: ApiListParams = {}
        // params.count = 3 // debug
        params.pageToken = pageToken.value
        const res = await PostGroupApi.getList(props.serviceId, params)
        res.items.map((item: PostGroupPublic) => {
          postGroups.push(item)
        })
        pageToken.value = res.pageToken
      } catch (error) {
        console.log(error)
      } finally {
        globalLoader.updateLoading(false)
      }
    }

    onBeforeMount(async () => {
      await setPostGroups()
    })

    return {
      postGroups,
      hasNext,
      setPostGroups
    }
  }
})
</script>

<template>
  <nav class="text-gray-500 dark:text-gray-400">
    <ul
      v-if="postGroups.length > 0"
      class="space-y-2"
    >
      <li
        v-for="postGroup in postGroups"
        :key="postGroup.label"
      >
        <RouterLink
          :to="`/post-groups/${postGroup.slug}/posts`"
          class="block py-2 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
        >
          {{ postGroup.label }}
        </RouterLink>
      </li>
    </ul>
    <div
      v-if="hasNext"
      class="mt-2"
    >
      <button
        @click="setPostGroups"
        class="text-sm text-gray-500 dark:text-gray-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
      >
        {{ $t('common.more') }}
      </button>
    </div>
  </nav>
</template>
