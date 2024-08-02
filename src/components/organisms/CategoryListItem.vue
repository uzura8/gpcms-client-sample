<script lang="ts">
import type { CategoryPublic } from '@/types/Category'
import { defineComponent, ref, computed, defineAsyncComponent } from 'vue'
import { CategoryApi } from '@/apis'

const CategoryListItem = defineAsyncComponent(
  () => import('@/components/organisms/CategoryListItem.vue')
) as any

export default defineComponent({
  components: {
    CategoryListItem
  },

  props: {
    cate: {
      type: Object as () => CategoryPublic,
      required: true
    },
    maxNodeDepth: {
      type: Number
    },
    isLast: {
      type: Boolean,
      default: false
    },
    isBorder: {
      type: Boolean,
      default: false
    }
  },

  setup(props) {
    const serviceId = computed(() => {
      return props.cate.serviceId
    })

    const isAccordionActive = ref<boolean>(false)

    const childCates = ref<CategoryPublic[]>([])

    const isLeafNode = computed(() => {
      if (!props.maxNodeDepth) return false
      const parentIds = props.cate.parentPath.split('#')
      return parentIds.length === props.maxNodeDepth
    })

    const setCates = async () => {
      const params = { subScope: 'direct' }
      const parent = await CategoryApi.getOneBySlug(serviceId.value, props.cate.slug, params)
      if (parent && parent.children) {
        childCates.value = parent.children
      }
    }

    const changeAccordionStatus = () => {
      isAccordionActive.value = !isAccordionActive.value
      if (isAccordionActive.value) {
        setCates()
      }
    }

    return {
      isAccordionActive,
      changeAccordionStatus,
      isLeafNode,
      childCates
    }
  }
})
</script>

<template>
  <div v-if="cate">
    <h2 class="relative">
      <button
        v-if="!isLeafNode"
        type="button"
        class="flex items-center justify-between w-full font-medium text-left text-gray-500 dark:text-gray-400"
        :class="{
          'border-b border-gray-200 dark:border-gray-700 py-5 px-2': isBorder,
          'py-2': !isBorder
        }"
        @click="changeAccordionStatus"
      >
        <span>{{ cate.label }}</span>
        <div class="flex"></div>
        <span class="absolute right-0">
          <FontAwesomeIcon
            v-if="isAccordionActive"
            icon="angle-up"
            class="w-3 h-3"
          />
          <FontAwesomeIcon
            v-else
            icon="angle-down"
            class="w-3 h-3"
          />
        </span>
      </button>
      <div v-else>
        <RouterLink
          :to="`/categories/${cate.slug}/posts`"
          class="flex items-center justify-between w-full font-medium text-left text-gray-500 dark:text-gray-400"
          :class="{
            'border-b border-gray-200 dark:border-gray-700': !isLast && isBorder,
            'py-5 pl-6': isBorder,
            'py-2 pl-3': !isBorder
          }"
        >
          {{ cate.label }}
          <FontAwesomeIcon
            icon="angle-right"
            class="w-3 h-3"
          />
        </RouterLink>
      </div>
    </h2>
    <div :class="{ hidden: !isAccordionActive }">
      <div
        v-if="childCates.length > 0"
        :class="{ 'border-b border-gray-200 dark:border-gray-700': isBorder }"
      >
        <CategoryListItem
          v-for="(childCate, index) in childCates"
          :key="childCate.id"
          :cate="childCate"
          :maxNodeDepth="maxNodeDepth"
          :isLast="index === childCates.length - 1"
        />
      </div>
    </div>
  </div>
</template>
