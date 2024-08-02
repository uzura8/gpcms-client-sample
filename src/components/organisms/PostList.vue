<script lang="ts">
import type { PropType } from 'vue'
import type { PostsCondition } from '@/stores/posts'
import { defineComponent, ref, computed, watch } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalLoaderStore } from '@/stores/globalLoader'
import { usePostsStore } from '@/stores/posts'
import { PostApi } from '@/apis'
import PostListItem from '@/components/organisms/PostListItem.vue'

// Types
interface Params {
  pagerKey?: string
  pageToken?: string
  tag?: string
  category?: string
  apiVer?: number
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
    categorySlug: {
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

    const postsStore = usePostsStore()
    const { posts, pageToken } = storeToRefs(postsStore)

    const hasNext = computed(() => !!pageToken.value)

    const postsCondition = computed(() => {
      const current: PostsCondition = {
        serviceId: props.serviceId,
        type: '',
        value: ''
      }
      if (props.tagLabel) {
        current.type = 'tag'
        current.value = props.tagLabel
      } else if (props.categorySlug) {
        current.type = 'category'
        current.value = props.categorySlug
      }
      return current
    })

    const setPostList = async () => {
      globalLoader.updateLoading(true)
      try {
        let params: Params = {}
        if (pageToken.value) {
          params.pageToken = pageToken.value
        }
        if (props.tagLabel) {
          params.tag = props.tagLabel
        } else if (props.categorySlug) {
          params.category = props.categorySlug
          params.apiVer = 2
        }
        const res = await PostApi.getList(props.serviceId, params)
        postsStore.setApiResult(res, postsCondition.value)
        globalLoader.updateLoading(false)
      } catch (error) {
        console.log(error)
        globalLoader.updateLoading(false)
      }
    }

    watch(
      () => postsCondition.value,
      async (val) => {
        if (postsStore.checkConditionChanged(val)) {
          postsStore.clearList()
          await setPostList()
        }
      },
      { immediate: true, deep: true }
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
