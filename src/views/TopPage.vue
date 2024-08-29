<script lang="ts">
import { defineComponent, onBeforeMount } from 'vue'
import { useHeadMeta } from '@/composables/useHeadMeta'

export default defineComponent({
  setup() {
    const { setMeta } = useHeadMeta()
    onBeforeMount(async () => {
      setMeta()
    })
  }
})
</script>

<template>
  <div>
    <h1 class="">{{ $t('page.top') }}</h1>
  </div>
</template>
