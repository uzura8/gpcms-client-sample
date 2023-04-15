<template>
  <div>
    <h1 class="text-4xl font-extrabold dark:text-white">{{ $t('term.postList') }}</h1>

    <div class="container mx-auto py-8 px-4">
      <div
        v-if="posts.length"
        class="grid grid-cols-1 gap-6"
      >
        <div
          v-for="post in posts"
          class="bg-white overflow-hidden rounded-lg shadow-md"
        >
          <div
            v-if="post.images.length > 0"
            class="relative"
          >
            <img src="https://picsum.photos/600/400" alt="記事画像" class="w-full h-64 object-cover">
          </div>
          <div class="p-6">
            <h3 class="text-xl font-medium text-gray-900 mb-4">
              {{ post.title }}
            </h3>
            <p class="text-gray-500 leading-relaxed mb-4">
              {{ $filters.substr(post.bodyText, 300) }}
            </p>
            <a href="#" class="text-indigo-500 font-medium inline-block">{{ $t('common.more') }}</a>
          </div>
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

export default defineComponent({
  name: 'PostListPage',

  components: {
  },

  setup() {
    let posts = ref([] as PostPublic[])
    let pagerKey = reactive({} as PagerKey)

    const hasNext = computed(() => Boolean(pagerKey))

    const getPostList = async () => {
      try {
        const serviceId = config.post.serviceId
        const res = await PostApi.getList(serviceId)
        res.items.map((item: PostPublic) => {
          posts.value.push(item)
        })
        pagerKey = res.pagerKey
      } catch (error) {
        console.log(error)
      }
    }

    onBeforeMount(async () => {
      await getPostList()
    })

    return {
      posts,
      pagerKey,
      getPostList,
      hasNext,
    }
  },
})
</script>
