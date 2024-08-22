import type { HeadMeta, HeadMetaInput } from '@/types/Common'
import { useSeoMeta } from '@unhead/vue'
import { ref } from 'vue'
import { config } from '@/configs'
import { siteUrl } from '@/utils/site'

export function useHeadMeta() {
  const meta = ref<HeadMeta>({
    title: config.site.name,
    description: null,
    ogSiteName: config.site.name,
    ogTitle: null,
    ogUrl: null,
    ogDescription: null,
    ogImage: null,
    ogType: 'article',
    twitterCard: null
  })

  const titleSuffix = ' | ' + config.site.name

  const setMeta = (inputMeta: HeadMetaInput) => {
    const newMeta = convertMetaInput(inputMeta)
    Object.assign(meta.value, newMeta)
    useSeoMeta(meta.value)
  }

  const convertMetaInput = (input: HeadMetaInput): HeadMeta => {
    const title = input.title + titleSuffix
    const newMeta: HeadMeta = {
      title: title,
      ogTitle: title
    }
    if (input.description) {
      newMeta.description = input.description
      newMeta.ogDescription = input.description
    }
    if (input.urlPath) newMeta.ogUrl = siteUrl(input.urlPath)
    if (input.imageUrl) newMeta.ogImage = input.imageUrl
    if (input.type) newMeta.ogType = input.type
    return newMeta
  }

  return {
    meta,
    setMeta
  }
}
