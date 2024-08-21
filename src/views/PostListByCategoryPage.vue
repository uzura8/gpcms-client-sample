<script lang="ts">
import type { CategoryPublic } from '@/types/Category'
import { defineComponent, ref, computed } from 'vue'
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

    const category = ref<CategoryPublic | null>(null)

    const updateCategory = (ev: CategoryPublic) => {
      category.value = ev
    }

    return {
      serviceId,
      cateSlug,
      category,
      updateCategory
    }
  }
})
</script>

<template>
  <div>
    <h1
      v-if="category"
      class="text-4xl font-extrabold dark:text-white"
    >
      {{ $t('common.postsOf', { label: `『${category.label}』` }) }}
    </h1>
    <div class="container mx-auto py-8">
      <PostList
        :serviceId="serviceId"
        :categorySlug="cateSlug"
        @updateCategory="updateCategory"
      />
    </div>
  </div>
</template>
