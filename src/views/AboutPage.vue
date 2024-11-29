<script lang="ts">
import type { HeadMetaInput } from '@/types/Common'
import type { PostPublic } from '@/types/Post'
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import { useHeadMeta } from '@/composables/useHeadMeta'
import useMedia from '@/commons/useMedia'
import { substr } from '@/utils/str'
import { PostApi } from '@/apis'
import config from '@/configs/config.json'
import PostBody from '@/components/atoms/PostBody.vue'

export default defineComponent({
  components: {
    PostBody
  },
  setup() {
    const { t } = useI18n()
    const route = useRoute()
    const { setMeta } = useHeadMeta()
    const globalLoader = useGlobalLoaderStore()
    const { mediaUrl } = useMedia()

    const serviceId = config.content.serviceId
    const slug = 'about'

    let post = ref({} as PostPublic)
    const setPost = async () => {
      globalLoader.updateLoading(true)
      try {
        post.value = await PostApi.getOne(serviceId, slug)

        const metaObj: HeadMetaInput = {
          title: post.value.title,
          urlPath: route.path
        }
        if (post.value.bodyText) {
          metaObj.description = substr(post.value.bodyText, 100, '...')
        }
        if (post.value.images && post.value.images.length > 0) {
          const img = post.value.images[0]
          const imgSize = config.post.ogpImageSize || '800x800'
          metaObj.imageUrl = mediaUrl(serviceId, 'image', img.fileId, img.mimeType, imgSize)
        }
        setMeta(metaObj)

        globalLoader.updateLoading(false)
      } catch (error) {
        console.log(error)
        globalLoader.updateLoading(false)
      }
    }

    onBeforeMount(async () => {
      // const metaObj: HeadMetaInput = {
      //   title: t('page.about'),
      //   description: t('msg.descriptionOfPageAbout', { label: t('page.about') })
      // }
      // setMeta(metaObj)
      await setPost()
    })

    return {
      post
    }
  }
})
</script>

<template>
  <div>
    <h1 class="text-4xl font-extrabold dark:text-white">{{ post.title }}</h1>
    <div class="mx-auto mt-12">
      <PostBody
        v-if="post.bodyHtml"
        :body="post.bodyHtml"
        :is-execute-script="true"
        class="mb-12"
      />
    </div>
  </div>
</template>
