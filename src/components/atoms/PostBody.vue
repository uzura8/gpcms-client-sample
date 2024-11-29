<template>
  <div
    id="html-container"
    class="post-body"
    v-html="body"
  ></div>
</template>

<script lang="ts">
import type { PropType } from 'vue'
import { defineComponent, ref, nextTick, watch, onMounted } from 'vue'

import 'highlight.js/styles/atom-one-dark.css'
import hljs from 'highlight.js'

export default defineComponent({
  components: {},

  props: {
    body: {
      type: String as PropType<string>,
      required: true
    },
    isExecuteScript: {
      type: Boolean as PropType<Boolean>,
      default: false
    }
  },

  setup(props) {
    const htmlContent = ref<string>('')
    const executeScripts = () => {
      const container = document.getElementById('html-container')
      if (!container) return

      const scripts = container.getElementsByTagName('script')
      Array.from(scripts).forEach((script) => {
        if (script.src) {
          // For external scripts
          const newScript = document.createElement('script')
          newScript.src = script.src
          newScript.defer = script.defer || false
          newScript.async = script.async || false
          document.body.appendChild(newScript)
        } else {
          // For inline scripts
          const newScript = document.createElement('script')
          newScript.textContent = script.textContent
          document.body.appendChild(newScript)
        }
      })
    }

    watch(
      () => props.isExecuteScript,
      async (newVal) => {
        if (newVal) {
          await nextTick()
          executeScripts()
        }
      },
      { immediate: true }
    )

    onMounted(() => {
      hljs.highlightAll()
    })

    return {}
  }
})
</script>
<style lang="scss">
@use '@/styles/browser-default.scss' as browser-default;

.post-body {
  @include browser-default.browser-default-styles;
  pre {
    padding: 0 0;
  }
}
</style>
