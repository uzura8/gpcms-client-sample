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
    const tagLabel = computed(() => {
      if (!route.params.tagLabel) return ''
      if (typeof route.params.tagLabel !== 'string') return ''
      return route.params.tagLabel
    })

    return {
      serviceId,
      tagLabel
    }
  }
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-extrabold dark:text-white">
      {{ $t('common.postsOf', { label: `『${tagLabel}』` }) }}
    </h1>
    <div class="container mx-auto py-8">
      <PostList
        :serviceId="serviceId"
        :tagLabel="tagLabel"
      />
    </div>
  </div>
</template>
