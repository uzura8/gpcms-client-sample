<template>
  <div>
    <GlobalLoading v-if="isGlobalLoading" />

    <div class="flex flex-col h-screen">
      <MainHeader />

      <div class="flex-1">
        <div class="lg:grid lg:grid-cols-12 h-full mx-auto">
          <main class="lg:col-span-9 xl:col-span-10 w-full py-8 px-6 md:max-w-4xl md:mx-auto">
            <RouterView />
          </main>

          <aside class="lg:col-span-3 xl:col-span-2 px-6 py-8">
            <MainSideMenu />
          </aside>
        </div>
      </div>

      <MainFooter />
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { storeToRefs } from 'pinia'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import GlobalLoading from '@/components/molecules/GlobalLoading.vue'
import MainHeader from '@/components/organisms/MainHeader.vue'
import MainSideMenu from '@/components/organisms/MainSideMenu.vue'
import MainFooter from '@/components/organisms/MainFooter.vue'

export default defineComponent({
  components: {
    GlobalLoading,
    MainHeader,
    MainSideMenu,
    MainFooter
  },

  setup() {
    // store
    const loader = useGlobalLoaderStore()
    const { isLoading: isGlobalLoading } = storeToRefs(loader)
    return { isGlobalLoading }
  }
})
</script>
