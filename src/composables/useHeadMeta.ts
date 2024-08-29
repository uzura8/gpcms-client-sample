import type { HeadMeta, HeadMetaInput } from '@/types/Common'
import { useSeoMeta, useHead } from '@unhead/vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { config } from '@/configs'
import { siteUrl } from '@/utils/site'

export function useHeadMeta() {
  const route = useRoute()

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

  const titleSuffix = config.site.name
  const suffixDelimiter = ' | '

  const setMeta = (inputMeta: HeadMetaInput = {}) => {
    const newMeta = convertMetaInput(inputMeta)
    Object.assign(meta.value, newMeta)
    useSeoMeta(meta.value)

    if (meta.value.ogUrl) {
      useHead({
        link: [
          {
            rel: 'canonical',
            href: meta.value.ogUrl
          }
        ]
      })
    }
  }

  const getTitle = (title: string) => {
    const titleItems = []
    if (title) {
      titleItems.push(title)
      titleItems.push(titleSuffix)
    }
    let res = titleItems.join(suffixDelimiter)
    if (!res) res = config.site.name
    return res
  }

  const convertMetaInput = (input: HeadMetaInput): HeadMeta => {
    const title = getTitle(String(input.title))
    const path = input.urlPath || route.path
    const newMeta: HeadMeta = {
      title: title,
      ogTitle: title,
      ogUrl: siteUrl(path)
    }
    if (input.description) {
      newMeta.description = input.description
      newMeta.ogDescription = input.description
    }
    if (input.imageUrl) newMeta.ogImage = input.imageUrl
    if (input.type) newMeta.ogType = input.type
    return newMeta
  }

  return {
    meta,
    setMeta
  }
}
