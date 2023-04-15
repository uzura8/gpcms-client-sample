<template>
  <header class="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white text-sm py-4 dark:bg-gray-800 z-40">
    <nav class="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between" aria-label="Global">
      <div class="flex items-center justify-between">
        <RouterLink
          to="/"
          class="flex-none text-xl font-semibold dark:text-white"
        >GPCMS</RouterLink>
        <div class="sm:hidden">
          <button
            @click="isOpen = !isOpen"
            type="button"
            :class="{ open: isOpen }"
            class="hs-collapse-toggle p-2 inline-flex justify-center items-center gap-2 rounded-md border font-medium bg-white text-gray-700 shadow-sm align-middle hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-white focus:ring-blue-600 transition-all text-sm dark:bg-slate-900 dark:hover:bg-slate-800 dark:border-gray-700 dark:text-gray-400 dark:hover:text-white dark:focus:ring-offset-gray-800"
            data-hs-collapse="#navbar-with-collapse"
            aria-controls="navbar-with-collapse"
            aria-label="Toggle navigation"
          >
            <svg class="hs-collapse-open:hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path fill-rule="evenodd" d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"/>
            </svg>
            <svg class="hs-collapse-open:block hidden w-4 h-4" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"/>
            </svg>
          </button>
        </div>
      </div>
      <div
        :class="isOpen ? 'open' : 'hidden'"
        id="navbar-with-collapse"
        class="basis-full grow sm:block"
      >
        <div class="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
          <RouterLink
            to="/"
            exact
            :aria-current="current === '/' ? 'page' : null"
            class="font-medium text-gray-600"
          >{{ $t('page.top') }}</RouterLink>
          <RouterLink
            to="/about"
            exact
            :aria-current="current === '/about' ? 'page' : null"
            class="font-medium text-gray-600"
          >{{ $t('page.about') }}</RouterLink>
          <RouterLink
            to="/posts"
            exact
            :aria-current="current === '/posts' ? 'page' : null"
            class="font-medium text-gray-600"
          >{{ $t('term.postList') }}</RouterLink>
        </div>
      </div>
    </nav>
  </header>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useRoute } from 'vue-router'

export default defineComponent({
  components: {
  },

  setup() {
    //data
    let isOpen = ref(false)

    // computed
    const route = useRoute()
    const current = computed((): string => route.path)

    return { isOpen, current }
  },
})
</script>

<style scoped>
.router-link-exact-active {
  color: #3B82F6;
}
</style>
