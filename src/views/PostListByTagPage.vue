<script lang="ts">
import type { HeadMetaInput } from '@/types/Common'
import { defineComponent, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
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

    const route = useRoute()
    const tagLabel = computed(() => {
      if (!route.params.tagLabel) return ''
      if (typeof route.params.tagLabel !== 'string') return ''
      return route.params.tagLabel
    })

    watch(
      tagLabel,
      (val) => {
        if (!val) return
        const metaObj: HeadMetaInput = {
          title: t('common.postsOf', { label: `『${tagLabel.value}』` }),
          description: t('msg.descriptionOfPostListAbout', { label: tagLabel.value })
        }
        setMeta(metaObj)
      },
      { immediate: true }
    )

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
