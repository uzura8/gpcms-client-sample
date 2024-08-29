<script lang="ts">
import type { HeadMetaInput } from '@/types/Common'
import type { PostGroupPublic } from '@/types/PostGroup'
import { defineComponent, ref, computed, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useHeadMeta } from '@/composables/useHeadMeta'
import { config } from '@/configs'
import PostListByGroup from '@/components/organisms/PostListByGroup.vue'

export default defineComponent({
  components: {
    PostListByGroup
  },

  setup() {
    const serviceId = config.post.serviceId
    const route = useRoute()
    const { t } = useI18n()
    const { setMeta } = useHeadMeta()

    const slug = computed(() => {
      if (!route.params.slug) return ''
      if (typeof route.params.slug !== 'string') return ''
      return route.params.slug
    })

    const postGroup = ref<PostGroupPublic | null>(null)
    const setPostGroup = (ev: PostGroupPublic) => {
      postGroup.value = ev
    }

    watch(
      postGroup,
      (val) => {
        if (!val) return
        const metaObj: HeadMetaInput = {
          title: t('common.postsOf', { label: `『${val.label}』` }),
          description: t('msg.descriptionOfPostListAbout', { label: val.label })
        }
        setMeta(metaObj)
      },
      { immediate: true, deep: true }
    )

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
