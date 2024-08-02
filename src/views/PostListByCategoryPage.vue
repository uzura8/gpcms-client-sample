<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useRoute } from 'vue-router'
import { config } from '@/configs'
import PostList from '@/components/organisms/PostList.vue'

export default defineComponent({
  components: {
    PostList
  },

  setup() {
    const serviceId = config.post.serviceId

    const route = useRoute()
    const cateSlug = computed(() => {
      if (!route.params.slug) return ''
      if (typeof route.params.slug !== 'string') return ''
      return route.params.slug
    })

    return {
      serviceId,
      cateSlug
    }
  }
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-extrabold dark:text-white">
      {{ $t('common.postsOf', { label: `『${cateSlug}』` }) }}
    </h1>
    <div class="container mx-auto py-8">
      <PostList
        :serviceId="serviceId"
        :categorySlug="cateSlug"
      />
    </div>
  </div>
</template>
