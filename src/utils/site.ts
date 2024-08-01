import config from '@/configs/config.json'

export function siteUrl(path: string): string {
  const trimPath = path.replace(/^\/|\/$/g, '')
  return `${config.site.baseUrl}/${trimPath}`
}
