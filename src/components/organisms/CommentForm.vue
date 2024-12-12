<script lang="ts">
import type { CommentFormValues } from '@/types/Comment'
import type { PropType } from 'vue'
import { useI18n } from 'vue-i18n'
import { defineComponent, ref, computed, onMounted } from 'vue'
import { useReCaptcha } from 'vue-recaptcha-v3'
import { useGlobalLoaderStore } from '@/stores/globalLoader'
import { useToast } from '@/composables/useToast'
import { trimSpaces, countChars } from '@/utils/str'
import { buttonClass } from '@/utils/style'
import { CommentApi } from '@/apis'
import FormInputField from '@/components/molecules/FormInputField.vue'
import { config } from '@/configs'

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
    const { notify } = useToast()
    const globalLoader = useGlobalLoaderStore()
    const isLoading = computed(() => globalLoader.isLoading)

    const isReCaptchaReady = ref<boolean>(false)
    const reCaptcha = useReCaptcha()
    const isEnabledRecapcha = computed(() => {
      return config.recapchaSiteKey.length > 0
    })

    const isEdit = ref<boolean>(false)

    type FieldErrors = {
      body: string
      nickname: string
      recaptcha: string
    }
    const errors = ref<FieldErrors>({
      body: '',
      nickname: '',
      recaptcha: ''
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
        nickname: '',
        recaptcha: ''
      }
    }

    const createComment = async (recaptchaToken = '') => {
      validateAll()
      if (hasErrors.value) return

      const values: CommentFormValues = {
        body: body.value,
        profiles: {
          nickname: nickname.value
        }
      }
      if (recaptchaToken) values.recaptcha = recaptchaToken
      try {
        globalLoader.updateLoading(true)
        const res = await CommentApi.create(props.serviceId, props.contentId, values)
        context.emit('createComment', res)
        notify(t('common.sentFor', { label: t('common.comment') }), 'success')
        resetForm()
      } catch (error) {
        console.log(error)
      } finally {
        globalLoader.updateLoading(false)
      }
    }

    const submitForm = async () => {
      validateAll()
      if (hasErrors.value) {
        notify(t('msg["Invalid inputs exists"]'), 'error')
        return
      }
      if (isEnabledRecapcha.value) {
        if (reCaptcha && reCaptcha.executeRecaptcha) {
          globalLoader.updateLoading(true)
          const token = await reCaptcha.executeRecaptcha('comment')
          globalLoader.updateLoading(false)
          await createComment(token)
        } else {
          console.error('ReCAPTCHA is not yet loaded.')
        }
      } else {
        await createComment()
      }
    }

    onMounted(() => {
      if (reCaptcha) {
        isReCaptchaReady.value = true
      } else {
        console.warn('ReCAPTCHA has not been loaded')
      }
    })

    return {
      isLoading,
      body,
      validateBody,
      nickname,
      validateNickname,
      submitForm,
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
        type="button"
        :disabled="hasErrors"
        :class="buttonClass('primary', 'base', false, hasErrors)"
        v-text="isEdit ? $t('common.update') : $t('common.send')"
        @click="submitForm"
      ></button>
    </div>
  </section>
</template>
