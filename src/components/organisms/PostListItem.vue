<script lang="ts">
import type { PostPublic } from '@/types/Post'
import type { PropType } from 'vue'
import { defineComponent, computed } from 'vue'
import { substr } from '@/utils/str'
import MediaImg from '@/components/atoms/MediaImg.vue'
import config from '@/configs/config.json'

export default defineComponent({
  components: {
    MediaImg
  },

  props: {
    post: {
      type: Object as PropType<PostPublic>,
      required: true
    }
  },

  setup() {
    const imageSize = computed((): string => {
      return config.post.listImageSize
    })

    return {
      substr,
      imageSize
    }
  }
})
</script>

<template>
  <div
    v-if="post"
    class="bg-white overflow-hidden rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3"
  >
    <div
      v-if="post.images && post.images.length > 0"
      class="relative col-span-2 md:col-span-1"
    >
      <MediaImg
        :service-id="post.serviceId"
        :file-id="post.images[0].fileId"
        :mime-type="post.images[0].mimeType"
        :size="imageSize"
      />
    </div>
    <div class="p-6 col-span-1 sm:col-span-2">
      <h3 class="text-xl font-medium text-gray-900 mb-4">
        <RouterLink
          :to="`/posts/${post.slug}`"
          class="text-blue-600 hover:text-blue-800"
          >{{ post.title }}</RouterLink
        >
      </h3>
      <p
        v-if="post.bodyText"
        class="text-gray-500 leading-relaxed mb-4"
      >
        {{ substr(post.bodyText, 300) }}
      </p>
      <RouterLink
        :to="`/posts/${post.slug}`"
        class="text-blue-600 hover:text-blue-800 font-medium inline-block"
        >{{ $t('common.more') }}</RouterLink
      >
    </div>
  </div>
</template>
