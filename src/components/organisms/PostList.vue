<script lang="ts">
import type { PostPublic } from '@/types/Post.d'
import type { PropType } from 'vue'
import { defineComponent, ref, computed, watch, onBeforeMount } from 'vue'
import { PostApi } from '@/apis'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import PostListItem from '@/components/organisms/PostListItem.vue'

// Types
interface Params {
  pagerKey?: string
  pageToken?: string
  tag?: string
}

export default defineComponent({
  components: {
    PostListItem
  },

  props: {
    serviceId: {
      type: String as PropType<string>,
      default: ''
    },

    tagLabel: {
      type: String as PropType<string>,
      default: ''
    }
  },

  setup(props) {
    const globalLoader = useGlobalLoaderStore()
    const isLoading = computed(() => globalLoader.isLoading)

    const posts = ref<PostPublic[]>([])
    const pageToken = ref<string | undefined>('')
    const hasNext = computed(() => Boolean(pageToken.value))

    // methods
    const setPostList = async () => {
      globalLoader.updateLoading(true)
      try {
        let params: Params = {}
        if (pageToken.value) {
          params.pageToken = pageToken.value
        }
        if (props.tagLabel) {
          params.tag = props.tagLabel
        }
        const res = await PostApi.getList(props.serviceId, params)
        res.items.map((item: PostPublic) => {
          posts.value.push(item)
        })
        pageToken.value = res.pageToken
        globalLoader.updateLoading(false)
      } catch (error) {
        console.log(error)
        globalLoader.updateLoading(false)
      }
    }

    onBeforeMount(async () => {
      await setPostList()
    })

    watch(
      () => props.tagLabel,
      async () => {
        posts.value = []
        pageToken.value = ''
        await setPostList()
      }
    )

    return {
      posts,
      pageToken,
      setPostList,
      hasNext,
      isLoading
    }
  }
})
</script>

<template>
  <div>
    <div
      v-if="posts.length"
      class="grid grid-cols-1 gap-6"
    >
      <PostListItem
        v-for="post in posts"
        :key="post.postId"
        :post="post"
      />
      <div
        v-if="hasNext"
        class="text-center"
      >
        <a
          @click="setPostList"
          class="cursor-pointer text-blue-600 hover:text-blue-800"
        >
          {{ $t('common.more') }}
        </a>
      </div>
    </div>

    <div v-else-if="!isLoading">
      <p class="text-gray-500 text-center">{{ $t('msg.noData') }}</p>
    </div>
  </div>
</template>
