import { substr } from '@/utils/str'

export default {
  substr(text: string, num: number) {
    return substr(text, num, '...')
  }
}
