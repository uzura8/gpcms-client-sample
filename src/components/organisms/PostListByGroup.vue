<script lang="ts">
import type { PostGroupPublic } from '@/types/PostGroup'
import { defineComponent, computed, ref, watch } from 'vue'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import { PostGroupApi } from '@/apis'
import PostListItem from '@/components/organisms/PostListItem.vue'

export default defineComponent({
  components: {
    PostListItem
  },

  props: {
    serviceId: {
      type: String,
      required: true
    },
    slug: {
      type: String,
      required: true
    }
  },

  // emits: ['setPostGroup'],

  setup(props, context) {
    const globalLoader = useGlobalLoaderStore()
    const isLoading = computed(() => globalLoader.isLoading)

    const group = ref<PostGroupPublic | null>(null)
    const setGroup = async () => {
      try {
        globalLoader.updateLoading(true)
        group.value = await PostGroupApi.getOne(props.serviceId, props.slug)
        context.emit('setPostGroup', group.value)
      } catch (error) {
        console.log(error)
      } finally {
        globalLoader.updateLoading(false)
      }
    }

    watch(
      () => props.slug,
      async () => {
        await setGroup()
      },
      { immediate: true }
    )

    return {
      group,
      isLoading
    }
  }
})
</script>

<template>
  <div>
    <div
      v-if="group && group.posts"
      class="grid grid-cols-1 gap-6"
    >
      <PostListItem
        v-for="post in group.posts"
        :key="post.postId"
        :post="post"
      />
    </div>

    <div v-else-if="!isLoading">
      <p class="text-gray-500 text-center">{{ $t('msg.noData') }}</p>
    </div>
  </div>
</template>
