import type { BasicObj } from '@/types/Common'
import { ref, watch } from 'vue'
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

  watch(
    categoryLabels,
    (val) => {
      console.log('categoryLabels', val)
    },
    { deep: true, immediate: true }
  )

  return { categoryLabels, setValue, getValue }
})
