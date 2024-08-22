<script lang="ts">
import type { PostGroupPublic } from '@/types/PostGroup'
import { defineComponent, computed, ref } from 'vue'
import { useRoute } from 'vue-router'
import { config } from '@/configs'
import PostListByGroup from '@/components/organisms/PostListByGroup.vue'

export default defineComponent({
  components: {
    PostListByGroup
  },

  setup() {
    const route = useRoute()
    const serviceId = config.post.serviceId

    const slug = computed(() => {
      if (!route.params.slug) return ''
      if (typeof route.params.slug !== 'string') return ''
      return route.params.slug
    })

    const postGroup = ref<PostGroupPublic | null>(null)
    const setPostGroup = (ev: PostGroupPublic) => {
      postGroup.value = ev
    }

    return {
      serviceId,
      slug,
      postGroup,
      setPostGroup
    }
  }
})
</script>

<template>
  <div>
    <h1
      v-if="postGroup"
      class="text-4xl font-extrabold dark:text-white"
    >
      {{ $t('common.postsOf', { label: `『${postGroup.label}』` }) }}
    </h1>
    <div class="container mx-auto py-8">
      <PostListByGroup
        :serviceId="serviceId"
        :slug="slug"
        @setPostGroup="setPostGroup"
      />
    </div>
  </div>
</template>
