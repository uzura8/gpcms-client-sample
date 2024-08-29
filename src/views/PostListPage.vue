<script lang="ts">
import type { HeadMetaInput } from '@/types/Common'
import { defineComponent, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHeadMeta } from '@/composables/useHeadMeta'
import { config } from '@/configs'
import PostList from '@/components/organisms/PostList.vue'

export default defineComponent({
  components: {
    PostList
  },

  setup() {
    const serviceId = config.post.serviceId
    const { t } = useI18n()
    const { setMeta } = useHeadMeta()

    onBeforeMount(async () => {
      const metaObj: HeadMetaInput = {
        title: t('term.postList'),
        description: t('msg.descriptionOfPostList')
      }
      setMeta(metaObj)
    })

    return {
      serviceId
    }
  }
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-extrabold dark:text-white">{{ $t('term.postList') }}</h1>
    <div class="container mx-auto py-8">
      <PostList :service-id="serviceId" />
    </div>
  </div>
</template>
