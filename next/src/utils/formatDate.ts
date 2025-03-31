import { convert, ZonedDateTime } from '@js-joda/core'

// "1.3.2021"
export const getNumericLocalDate = (dateString: string) =>
  dateString
    ? convert(ZonedDateTime.parse(dateString))
        .toDate()
        .toLocaleDateString('sk', {
          dateStyle: 'short',
        })
        .replaceAll(' ', '')
    : 'Invalid date'

// TODO unify with getNumericLocalDate
// "01. 03. 2021"
export const formatDate = (dateISOString: string | undefined | null) => {
  if (!dateISOString) return ''
  const date = new Date(dateISOString)

  return date.toLocaleDateString('sk-SK', { month: '2-digit', day: '2-digit', year: 'numeric' })
}
