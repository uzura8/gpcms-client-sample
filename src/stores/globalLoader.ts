import { ref } from 'vue'
import { defineStore } from 'pinia'

export const useGlobalLoaderStore = defineStore('globalLoader', () => {
  const isLoading = ref(false)
  //const doubleCount = computed(() => count.value * 2)

  const updateState = (state: boolean): void => {
    isLoading.value = state
  }

  return { isLoading, updateState }
})
