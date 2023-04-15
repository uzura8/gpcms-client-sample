<template>
  <div>
    <h1 class="text-4xl font-extrabold dark:text-white">{{ $t('term.postList') }}</h1>

    <div class="container mx-auto py-8">
      <div
        v-if="posts.length"
        class="grid grid-cols-1 gap-6"
      >
        <div
          v-for="post in posts"
          :key="post.postId"
          class="bg-white overflow-hidden rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3"
        >
          <div
            v-if="post.images.length > 0"
            class="relative col-span-2 md:col-span-1"
          >
            <MediaImg
              :service-id="serviceId"
              :file-id="post.images[0].fileId"
              :mime-type="post.images[0].mimeType"
              size="1200x800xc"
            />
          </div>
          <div class="p-6 col-span-1 sm:col-span-2">
            <h3 class="text-xl font-medium text-gray-900 mb-4">
              {{ post.title }}
            </h3>
            <p class="text-gray-500 leading-relaxed mb-4">
              {{ $filters.substr(post.bodyText, 300) }}
            </p>
            <a href="#" class="text-indigo-500 font-medium inline-block">{{ $t('common.more') }}</a>
          </div>
        </div>
        <div
          v-if="hasNext"
          class="text-center"
        >
          <a
            @click="setPostList"
            class="cursor-pointer text-blue-600 hover:text-blue-800"
          >{{ $t('common.more') }}</a>
        </div>
      </div>

      <div v-else>
        <p class="text-gray-500 text-center">{{ $t('msg.noData') }}</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import type { PostPublic, PagerKey } from '@/types/Post.d'
import { defineComponent, reactive, ref, computed, onBeforeMount } from 'vue'
import { config } from '@/configs'
import { PostApi } from '@/apis'
import { storeToRefs } from 'pinia'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import MediaImg from '@/components/atoms/MediaImg.vue'

interface Params {
  pagerKey?: string
}

export default defineComponent({
  components: {
    MediaImg,
  },

  setup() {
    // data
    let posts = ref([] as PostPublic[])
    let pagerKey = reactive({} as PagerKey)

    // store
    const globalLoader = useGlobalLoaderStore()
    const { isLoading: isGlobalLoading } = storeToRefs(globalLoader)

    // computed
    const serviceId = computed(() => config.post.serviceId)
    const hasNext = computed(() => Boolean(pagerKey))

    // methods
    const setPostList = async () => {
      globalLoader.updateState(true)
      try {
        const serviceId = config.post.serviceId
        let params: Params = {}
        if (Object.keys(pagerKey).length > 0) {
          params.pagerKey = JSON.stringify(pagerKey)
        }
        const res = await PostApi.getList(serviceId, params)
        res.items.map((item: PostPublic) => {
          posts.value.push(item)
        })
        pagerKey = res.pagerKey
        globalLoader.updateState(false)
      } catch (error) {
        console.log(error)
        globalLoader.updateState(false)
      }
    }

    onBeforeMount(async () => {
      await setPostList()
    })

    return {
      serviceId,
      posts,
      pagerKey,
      setPostList,
      hasNext,
      isGlobalLoading,
    }
  },
})
</script>
