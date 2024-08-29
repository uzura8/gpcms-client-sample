<script lang="ts">
import type { CategoryPublic, ApiListParamsCategory } from '@/types/Category'
import { defineComponent, ref, onBeforeMount } from 'vue'
import { useGlobalLoaderStore } from '@/stores/globalLoader.js'
import { useCategoryLabelsStore } from '@/stores/categoryLabels'
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
    const globalLoader = useGlobalLoaderStore()
    const cateLabelsStore = useCategoryLabelsStore()

    const categories = ref<CategoryPublic[]>([])
    const maxNodeDepth = 2

    const setCategories = async () => {
      try {
        globalLoader.updateLoading(true)
        let params: ApiListParamsCategory = {}
        params.subScope = 'direct'
        params.apiVer = 2
        const res = await CategoryApi.getOneBySlug(props.serviceId, 'root', params)
        if (res.children) {
          categories.value = res.children
          categories.value.map((cate) => {
            cateLabelsStore.setValue(cate.slug, cate.label)
          })
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
