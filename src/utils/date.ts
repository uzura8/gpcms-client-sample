import moment from '@/moment'

export function formatDate(date: string, format = 'LLL'): string {
  return moment(date).format(format)
}
