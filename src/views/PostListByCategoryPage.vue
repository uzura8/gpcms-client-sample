<script lang="ts">
import type { CategoryPublic } from '@/types/Category'
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCategoryLabelsStore } from '@/stores/categoryLabels'
import { config } from '@/configs'
import PostList from '@/components/organisms/PostList.vue'

export default defineComponent({
  components: {
    PostList
  },

  setup() {
    const serviceId = config.post.serviceId
    const cateLabelsStore = useCategoryLabelsStore()
    const route = useRoute()

    const cateSlug = computed(() => {
      if (!route.params.slug) return ''
      if (typeof route.params.slug !== 'string') return ''
      return route.params.slug
    })

    const category = ref<CategoryPublic | null>(null)
    const updateCategory = (ev: CategoryPublic) => {
      category.value = ev
      cateLabelsStore.setValue(cateSlug.value, ev.label)
    }

    const cateLabel = computed(() => {
      const storedLabel = cateLabelsStore.getValue(cateSlug.value)
      console.log(111100000, cateSlug.value, storedLabel, category.value)
      if (storedLabel) return storedLabel
      if (!category.value) return ''
      return category.value.label
    })

    return {
      serviceId,
      cateSlug,
      category,
      updateCategory,
      cateLabel
    }
  }
})
</script>

<template>
  <div>
    <h1
      v-if="cateLabel"
      class="text-4xl font-extrabold dark:text-white"
    >
      {{ $t('common.postsOf', { label: `『${cateLabel}』` }) }}
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
