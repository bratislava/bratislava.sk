import { OfficialBoardPublicationState, PublicationYearOption } from '@/src/services/ginis/types'

export const START_YEAR = 2018
export const CURRENT_YEAR = new Date().getFullYear()

export const getYears = (
  publicationState: OfficialBoardPublicationState,
): PublicationYearOption[] => {
  const currentYear = new Date().getFullYear()

  const years = Array.from({ length: currentYear - START_YEAR + 1 }, (_, index) => {
    const year = currentYear - index

    return {
      id: year.toString(),
      title: year.toString(),
    }
  })

  return publicationState === 'vyveseno' ? [{ id: 'all', title: 'All' }, ...years] : years
}
