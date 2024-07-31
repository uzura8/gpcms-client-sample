<script lang="ts">
import type { CategoryPublic, ApiListParamsCategory } from '@/types/Category'
import { defineComponent, ref, watch, onBeforeMount } from 'vue'
import { useRoute } from 'vue-router'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import { CategoryApi } from '@/apis'
import CategoryListItem from '@/components/organisms/CategoryListItem.vue'

export default defineComponent({
  components: {
    CategoryListItem
  },

  props: {
    serviceId: {
      type: String,
      required: true
    }
  },

  setup(props) {
    const maxNodeDepth = 2

    const route = useRoute()
    const globalLoader = useGlobalLoaderStore()

    const categories = ref<CategoryPublic[]>([])

    const setCategories = async () => {
      try {
        globalLoader.updateLoading(true)
        let params: ApiListParamsCategory = {}
        params.subScope = 'direct'
        const res = await CategoryApi.getOneBySlug(props.serviceId, 'root', params)
        if (res.children) {
          categories.value = res.children
        }
      } catch (error) {
        console.log(error)
      } finally {
        globalLoader.updateLoading(false)
      }
    }

    onBeforeMount(async () => {
      await setCategories()
    })

    return {
      categories,
      maxNodeDepth
    }
  }
})
</script>

<template>
  <div>
    <div>
      <CategoryListItem
        v-for="cate in categories"
        :key="cate.id"
        :cate="cate"
        :maxNodeDepth="maxNodeDepth"
      />
    </div>
  </div>
</template>
