<template>
  <div>
    <h1 class="text-4xl font-extrabold dark:text-white">{{ $t('term.postList') }}</h1>
    <div class="container mx-auto py-8">
      <PostList :service-id="serviceId"/>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { config } from '@/configs'
import PostList from '@/components/organisms/PostList.vue'

export default defineComponent({
  components: {
    PostList,
  },

  setup() {
    // computed
    const serviceId = computed(() => config.post.serviceId)

    return {
      serviceId,
    }
  },
})
</script>
