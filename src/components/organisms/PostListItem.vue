<template>
  <div
    class="bg-white overflow-hidden rounded-lg shadow-md grid grid-cols-1 md:grid-cols-3"
  >
    <div
      v-if="post.images.length > 0"
      class="relative col-span-2 md:col-span-1"
    >
      <MediaImg
        :service-id="post.serviceId"
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
</template>

<script lang="ts">
import type { PostPublic } from '@/types/Post.d'
import type { PropType } from 'vue'
import { defineComponent } from 'vue'
import MediaImg from '@/components/atoms/MediaImg.vue'

export default defineComponent({
  props: {
    post: {
      type: Object as PropType<PostPublic>,
      default: '',
    },
  },

  components: {
    MediaImg,
  },

  setup(props) {
    return {
      post: props.post,
    }
  },
})
</script>