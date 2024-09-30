<script lang="ts">
import type { CommentFormValues } from '@/types/Comment'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineComponent, ref, computed } from 'vue'
import { useGlobalLoaderStore } from '@/stores/globalLoader'
import { trimSpaces, countChars } from '@/utils/str'
import { buttonClass } from '@/utils/style'
import { CommentApi } from '@/apis'
import FormInputField from '@/components/molecules/FormInputField.vue'

export default defineComponent({
  components: {
    FormInputField
  },

  emits: ['createComment'],

  props: {
    serviceId: {
      type: String as PropType<string>,
      required: true
    },
    contentId: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup(props, context) {
    const { t } = useI18n()
    const globalLoader = useGlobalLoaderStore()
    const isLoading = computed(() => globalLoader.isLoading)

    const isEdit = ref<boolean>(false)

    type FieldErrors = {
      body: string
      nickname: string
    }
    const errors = ref<FieldErrors>({
      body: '',
      nickname: ''
    })
    const hasErrors = computed(() => {
      return Object.values(errors.value).some((error) => error)
    })

    const body = ref<string>('')
    const validateBody = () => {
      errors.value.body = ''
      body.value = trimSpaces(body.value)
      if (!body.value) {
        errors.value.body = t('msg.inputRequired')
      } else if (countChars(body.value) > 1000) {
        errors.value.body = t('msg.inputNoMoreThanTargetCharacters', { num: 1000 })
      }
    }

    const nickname = ref<string>('')
    const validateNickname = () => {
      errors.value.nickname = ''
      nickname.value = trimSpaces(nickname.value)
      if (nickname.value && countChars(nickname.value) > 50) {
        errors.value.nickname = t('msg.inputNoMoreThanTargetCharacters', { num: 50 })
      }
    }

    const validateAll = () => {
      validateBody()
      validateNickname()
    }

    const resetForm = () => {
      body.value = ''
      nickname.value = ''
      errors.value = {
        body: '',
        nickname: ''
      }
    }

    const createComment = async () => {
      validateAll()
      if (hasErrors.value) return

      const values: CommentFormValues = {
        body: body.value,
        profiles: {
          nickname: nickname.value
        }
      }

      try {
        globalLoader.updateLoading(true)
        const res = await CommentApi.create(props.serviceId, props.contentId, values)
        context.emit('createComment', res)
        resetForm()
      } catch (error) {
        console.log(error)
      } finally {
        globalLoader.updateLoading(false)
      }
    }

    return {
      isLoading,
      body,
      validateBody,
      nickname,
      validateNickname,
      createComment,
      errors,
      hasErrors,
      isEdit,
      buttonClass
    }
  }
})
</script>

<template>
  <section class="space-y-4">
    <FormInputField
      v-model="nickname"
      :label-text="`${$t('term.userName')} (${$t('common.optional')})`"
      :error-text="errors.nickname"
      @blur="validateNickname"
    />
    <FormInputField
      v-model="body"
      input-type="textarea"
      :label-text="$t('common.comment')"
      :error-text="errors.body"
      @blur="validateBody"
    />
    <div>
      <p
        v-if="hasErrors"
        class="pb-4 text-danger-600 dark:text-danger-500"
      >
        {{ $t('msg.errorsExist') }}
      </p>

      <button
        @click="createComment"
        type="button"
        :disabled="hasErrors"
        :class="buttonClass('primary', 'base', false, hasErrors)"
        v-text="isEdit ? $t('common.update') : $t('common.send')"
      ></button>
    </div>
  </section>
</template>
