<script lang="ts">
import { defineComponent } from 'vue'
import config from '@/configs/config.json'
import CategoryList from '@/components/organisms/CategoryList.vue'
import TagList from '@/components/organisms/TagList.vue'

export default defineComponent({
  components: {
    CategoryList,
    TagList
  },

  setup() {
    const serviceId: string = config.post.serviceId

    return {
      serviceId
    }
  }
})
</script>

<template>
  <div>
    <section>
      <h5 class="text-xl font-semibold text-gray-600 dark:text-gray-300">
        {{ $t('common.categoriesShort') }}
      </h5>
      <CategoryList
        :serviceId="serviceId"
        class="mt-4 px-2 mx-auto"
      />
    </section>

    <section>
      <h5 class="mt-12 text-xl font-semibold text-gray-600 dark:text-gray-300">
        {{ $t('common.tagsShort') }}
      </h5>
      <TagList
        :serviceId="serviceId"
        class="mt-4 px-2 mx-auto"
      />
    </section>
  </div>
</template>
