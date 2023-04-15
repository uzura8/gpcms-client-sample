<template>
  <figure class="">
    <img
      :src="imageUrl"
      @error="noImageUrl"
      :class="{ 'rounded-lg': isRounded, 'cursor-pointer': isClickable }"
      class="h-auto max-w-full"
      :alt="caption ? caption : ''"
    >
    <figcaption
      v-if="caption && isDisplayCaption"
      class="mt-2 text-sm text-center text-gray-500 dark:text-gray-400"
    >{{ caption }}</figcaption>
  </figure>
</template>

<script lang="ts">
//import type { MimeTypeImage } from '@/types/Media.d'
import { defineComponent, computed } from 'vue'
import useMedia from '@/commons/useMedia'

//interface Props {
//  fileId: string
//  mimeType: MimeTypeImage
//  size: string
//  src: string
//  caption: string
//  sizeClass: string
//  isClickable: boolean
//  isRounded: boolean
//  isDisplayCaption: boolean
//}

export default defineComponent({
  props: {
    serviceId: {
      type: String,
      default: '',
    },
    fileId: {
      type: String,
      default: '',
    },
    mimeType: {
      type: String,
      default: '',
    },
    size: {
      type: String,
      default: 'raw',
    },
    src: {
      type: String,
      default: '',
    },
    sizeClass: {
      type: String,
      default: '',
    },
    caption: {
      type: String,
      default: '',
    },
    isClickable: {
      type: Boolean,
      default: false,
    },
    isRounded: {
      type: Boolean,
      default: false,
    },
    isDisplayCaption: {
      type: Boolean,
      default: false,
    },
  },

  setup(props) {
    const { mediaUrl, assetUrl } = useMedia()

    const imageUrl = computed((): string => {
      if (props.src) return props.src
      return mediaUrl(props.serviceId, 'image', props.fileId, props.mimeType, props.size)
    })

    const noImageUrl = (event: any): void => {
      // TODO: 型定義を追加する
      if ((event.target instanceof HTMLImageElement) === false) return
      if (event.target == null) return
      event.target.src = assetUrl('assets/img/noimage.jpg')
    }

    //const activate = () => {
    //  if (props.isClickable === false) return
    //  contexst.emit('activate', imageUrl.value)
    //}

    return {
      imageUrl,
      noImageUrl,
      //activate,
    }
  },
})
</script>

