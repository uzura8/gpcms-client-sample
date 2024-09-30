<script lang="ts">
import type { ApiListParams } from '@/types/Common'
import type { CommentPublic, CommentsApiResult } from '@/types/Comment'
import type { PropType } from 'vue'
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useGlobalLoaderStore } from '@/stores/globalLoader'
import { CommentApi } from '@/apis'
import { formatDate } from '@/utils/date'
import { numFormat } from '@/utils/str'
import CommentForm from '@/components/organisms/CommentForm.vue'

// Types
interface Params extends ApiListParams {
  pagerKey?: string
  apiVer?: number
}

export default defineComponent({
  components: {
    CommentForm
  },

  props: {
    serviceId: {
      type: String as PropType<string>,
      required: true
    },
    contentId: {
      type: String as PropType<string>,
      required: true
    },
    enabledForm: {
      type: Boolean as PropType<boolean>,
      default: false
    }
  },

  setup(props) {
    const globalLoader = useGlobalLoaderStore()
    const isLoading = computed(() => globalLoader.isLoading)

    const comments = ref<CommentPublic[]>([])

    const pageToken = ref<string | undefined>(undefined)
    const hasNext = computed(() => !!pageToken.value)

    const commentCount = ref<number>(0)
    const paramsDef: Params = {
      order: 'desc',
      count: 3,
      apiVer: 2
    }

    const fetchComments = async (
      params: Params,
      displayLoading = true
    ): Promise<CommentsApiResult | null> => {
      if (displayLoading) globalLoader.updateLoading(true)
      try {
        return await CommentApi.getList(props.serviceId, props.contentId, params)
      } catch (error) {
        console.log(error)
        return null
      } finally {
        if (displayLoading) globalLoader.updateLoading(false)
      }
    }

    const setCommentList = async () => {
      let params: Params = { ...paramsDef }
      if (pageToken.value) {
        params.pageToken = pageToken.value
      }
      const res = await fetchComments(params)
      if (res) {
        if (res.items && res.items.length) {
          res.items.forEach((item) => {
            comments.value.push(item)
          })
        }
        if (res.meta && res.meta.count) {
          commentCount.value = res.meta.count
        }
        pageToken.value = res.pageToken
      }
    }

    const checkAndApplyLatestComments = async () => {
      let params: Params = { ...paramsDef }
      const res = await fetchComments(params, false)
      if (!res || !res.items || res.items.length < 1) return
      if (res.items[1].commentId === comments.value[1].commentId) return

      comments.value = []
      res.items.forEach((item) => {
        comments.value.push(item)
      })
    }

    const updateCommentList = (comment: CommentPublic) => {
      comments.value.unshift(comment)
      commentCount.value += 1
      checkAndApplyLatestComments()
    }

    onMounted(async () => {
      await setCommentList()
    })

    return {
      comments,
      pageToken,
      commentCount,
      setCommentList,
      updateCommentList,
      hasNext,
      isLoading,
      formatDate,
      numFormat
    }
  }
})
</script>

<template>
  <section>
    <div class="flex justify-between items-center mb-6">
      <h3 class="text-lg lg:text-2xl font-bold text-gray-900 dark:text-white">
        {{ $t('common.commentsShort') }}
        ({{ numFormat(commentCount) }})
      </h3>
    </div>
    <div
      v-if="enabledForm"
      class="mb-10"
    >
      <CommentForm
        :serviceId="serviceId"
        :contentId="contentId"
        @create-comment="updateCommentList"
      />
    </div>
    <div>
      <div v-if="comments.length">
        <ul class="grid grid-cols-1">
          <li
            v-for="comment in comments"
            :key="comment.commentId"
            class="p-6 text-base bg-white rounded-lg dark:bg-gray-900"
          >
            <footer class="flex justify-between items-center mb-2">
              <div class="flex items-center">
                <p
                  class="inline-flex items-center mr-3 text-sm text-gray-900 dark:text-white font-semibold"
                >
                  <FontAwesomeIcon
                    class="w-6 h-6 mr-2 text-gray-400 dark:text-gray-500"
                    icon="user-circle"
                  />
                  <span v-if="comment.profiles && comment.profiles.nickname">
                    {{ comment.profiles.nickname }}
                  </span>
                </p>
                <p class="text-sm text-gray-600 dark:text-gray-400">
                  <time
                    pubdate
                    itemprop="datepublished"
                    :datetime="formatDate(comment.createdAt)"
                  >
                    {{ formatDate(comment.createdAt) }}
                  </time>
                </p>
              </div>
            </footer>
            <div class="text-gray-500 dark:text-gray-400">
              {{ comment.body }}
            </div>
          </li>
        </ul>
        <div
          v-if="hasNext"
          class="text-center"
        >
          <a
            @click="setCommentList"
            class="cursor-pointer text-blue-600 hover:text-blue-800"
          >
            {{ $t('common.more') }}
          </a>
        </div>
      </div>

      <div v-else-if="!isLoading">
        <p class="text-gray-500 text-center">{{ $t('msg.noData') }}</p>
      </div>
    </div>
  </section>
</template>
