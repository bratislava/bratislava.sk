import groupBy from 'lodash/groupBy'
import sortBy from 'lodash/sortBy'

// TODO this should be thrown away
// Page Accordion Items
export const groupByCategory = <T extends { category?: string | null }>(items: T[]) => {
  const grouped = groupBy(items, (item) => item?.category)
  const sorted = sortBy(grouped, (group) => items.indexOf(group[0]))

  return Object.keys(sorted).map((key) => ({
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    category: sorted[key].length > 0 ? sorted[key][0]?.category : (key as string | null),
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    items: sorted[key] as T[],
  }))
}
