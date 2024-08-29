import type { BasicObj } from '@/types/Common'
import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useCategoryLabelsStore = defineStore('categoryLabels', () => {
  const categoryLabels = ref<BasicObj>({})

  const setValue = (slug: string, label: string) => {
    categoryLabels.value[slug] = label
  }

  const getValue = (slug: string) => {
    if (categoryLabels.value[slug]) return categoryLabels.value[slug]
    return ''
  }

  return { categoryLabels, setValue, getValue }
})
