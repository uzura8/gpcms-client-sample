<script lang="ts">
import type { HeadMetaInput } from '@/types/Common'
import { defineComponent, onBeforeMount } from 'vue'
import { useI18n } from 'vue-i18n'
import { useHeadMeta } from '@/composables/useHeadMeta'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const { setMeta } = useHeadMeta()

    onBeforeMount(async () => {
      const metaObj: HeadMetaInput = {
        title: t('page.about'),
        description: t('msg.descriptionOfPageAbout', { label: t('page.about') })
      }
      setMeta(metaObj)
    })
  }
})
</script>

<template>
  <div>
    <h1 class="">{{ $t('page.about') }}</h1>
  </div>
</template>
