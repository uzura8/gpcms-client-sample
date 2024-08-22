import type { AxiosError } from 'axios'
import { useI18n } from 'vue-i18n'
import { useToast } from '@/composables/useToast'

interface ErrorMessage {
  status: number
  message: string
}

export function useApiError() {
  const { t } = useI18n()
  const { notify } = useToast()

  const handleApiError = (error: any, errorMessages: ErrorMessage[] = []) => {
    const apiError = error as AxiosError
    console.error('apiError', apiError)
    let message = ''
    errorMessages.forEach((errorMessage) => {
      if (apiError.response?.status === errorMessage.status) {
        message = errorMessage.message
      }
    })
    if (!message) {
      if (apiError.response?.status == 400) {
        message = t('error.400')
      } else if (apiError.response?.status == 401) {
        message = t('error.401')
      } else if (apiError.response?.status == 403) {
        message = t('error.403')
      } else if (apiError.response?.status == 404) {
        message = t('error.404')
      } else if (apiError.response?.status == 500) {
        message = t('error.500')
      } else if (apiError.response?.status == 503) {
        message = t('error.503')
      } else {
        message = t('msg.errorOccurred')
      }
    }
    notify(message, 'error')
  }

  return {
    handleApiError
  }
}
