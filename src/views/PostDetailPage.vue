<script lang="ts">
import type { HeadMetaInput } from '@/types/Common'
import type { PostPublic } from '@/types/Post'
import { defineComponent, computed, ref, onBeforeMount } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import { useHeadMeta } from '@/composables/useHeadMeta'
import useMedia from '@/commons/useMedia'
import config from '@/configs/config.json'
import { formatDate } from '@/utils/date'
import { substr } from '@/utils/str'
import { badgeClass } from '@/utils/style'
import { PostApi } from '@/apis'
import PostBody from '@/components/atoms/PostBody.vue'
import CommentList from '@/components/organisms/CommentList.vue'

export default defineComponent({
  components: {
    PostBody,
    CommentList
  },

  setup() {
    const route = useRoute()
    const router = useRouter()

    const goBack = () => {
      router.go(-1)
    }

    const serviceId = config.post.serviceId
    const isEnabledComment = config.post.enabledComment
    const globalLoader = useGlobalLoaderStore()
    const { setMeta } = useHeadMeta()
    const { mediaUrl } = useMedia()

    const slug = computed(() => {
      return route.params.slug ? (route.params.slug as string) : ''
    })

    const previewToken = computed(() => {
      return route.query.previewToken ? (route.query.previewToken as string) : ''
    })

    let post = ref({} as PostPublic)
    const setPost = async () => {
      globalLoader.updateLoading(true)
      try {
        const params = previewToken.value ? { token: previewToken.value } : ''
        post.value = await PostApi.getOne(serviceId, slug.value, params)

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
      await setPost()
    })

    return {
      post,
      serviceId,
      isEnabledComment,
      formatDate,
      setPost,
      badgeClass,
      goBack
    }
  }
})
</script>

<template>
  <div v-if="post">
    <div class="mb-12">
      <button
        @click="goBack"
        class="text-lg font-medium text-primary-600 dark:text-primary-500 hover:underline"
      >
        <FontAwesomeIcon
          icon="angle-left"
          class="me-2"
        />
        <span>{{ $t('common.posts') }}</span>
      </button>
    </div>

    <h1 class="text-4xl font-extrabold dark:text-white">{{ post.title }}</h1>
    <div class="container mx-auto">
      <PostBody
        v-if="post.bodyHtml"
        :body="post.bodyHtml"
        class="mb-12"
      />

      <dl class="space-y-4">
        <div
          v-if="post.publishAt"
          class="sm:flex sm:items-center"
        >
          <dt class="w-24 font-medium text-gray-500 dark:text-white">
            {{ $t('common.publishAt') }}
          </dt>
          <dd class="text-lg dark:text-white sm:flex-1">
            <time
              itemprop="datepublished"
              :datetime="formatDate(post.publishAt)"
            >
              {{ formatDate(post.publishAt) }}
            </time>
          </dd>
        </div>
        <div
          v-if="post && post.category"
          class="sm:flex sm:items-center"
        >
          <dt class="w-24 font-medium text-gray-500 dark:text-white">
            {{ $t('common.category') }}
          </dt>
          <dd class="text-lg dark:text-white sm:flex-1">
            <RouterLink
              :to="`/categories/${post.category.slug}/posts`"
              class="font-medium text-primary-600 dark:text-primary-500 hover:underline"
            >
              {{ post.category.label }}
            </RouterLink>
          </dd>
        </div>
        <div
          v-if="post && post.tags"
          class="sm:flex sm:items-center"
        >
          <dt class="w-24 font-medium text-gray-500 dark:text-white">
            {{ $t('common.tagsShort') }}
          </dt>
          <dd class="text-lg dark:text-white sm:flex-1">
            <ul class="flex flex-wrap">
              <li
                v-for="tag in post.tags"
                :key="tag.tagId"
                class="mb-1"
              >
                <RouterLink
                  :to="`/tags/${tag.label}/posts`"
                  :class="badgeClass('primary', 'sm', true, false, true)"
                >
                  {{ tag.label }}
                </RouterLink>
              </li>
            </ul>
          </dd>
        </div>
      </dl>
    </div>

    <CommentList
      v-if="isEnabledComment && post && post.postId"
      :service-id="serviceId"
      :content-id="`post-${post.postId}`"
      :enabled-form="true"
      class="mt-16"
    />
  </div>
</template>
