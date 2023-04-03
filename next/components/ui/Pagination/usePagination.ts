import { PressEvent } from '@react-types/shared'

type ItemType = 'first' | 'previous' | 'start-ellipsis' | 'end-ellipsis' | 'next' | 'last' | number

// https://dev.to/namirsab/comment/2050
const range = (start: number, end: number) => {
  const length = end - start + 1
  return Array.from({ length }, (_, i) => start + i)
}

// eslint-disable-next-line no-secrets/no-secrets
/**
 * @mui/material contains a really useful hook for pagination, so this is a copied version with added types.
 *
 * https://github.com/mui/material-ui/blob/512896973499adbbda057e7f3685d1b23cc02de9/packages/mui-material/src/usePagination/usePagination.js
 */
// eslint-disable-next-line sonarjs/cognitive-complexity
export default function usePagination(props: {
  boundaryCount?: number
  count?: number
  disabled?: boolean
  hideNextButton?: boolean
  hidePrevButton?: boolean
  onChange: (event: PressEvent, page: number) => void
  page: number
  showFirstButton?: boolean
  showLastButton?: boolean
  siblingCount?: number
}) {
  const {
    boundaryCount = 1,
    count = 1,
    disabled = false,
    hideNextButton = false,
    hidePrevButton = false,
    onChange: handleChange,
    page,
    showFirstButton = false,
    showLastButton = false,
    siblingCount = 1,
  } = props

  const handlePress = (event: PressEvent, value: number) => {
    if (handleChange) {
      handleChange(event, value)
    }
  }

  const startPages = range(1, Math.min(boundaryCount, count))
  const endPages = range(Math.max(count - boundaryCount + 1, boundaryCount + 1), count)

  const siblingsStart = Math.max(
    Math.min(
      // Natural start
      page - siblingCount,
      // Lower boundary when page is high
      count - boundaryCount - siblingCount * 2 - 1,
    ),
    // Greater than startPages
    boundaryCount + 2,
  )

  const siblingsEnd = Math.min(
    Math.max(
      // Natural end
      page + siblingCount,
      // Upper boundary when page is low
      boundaryCount + siblingCount * 2 + 2,
    ),
    // Less than endPages
    endPages.length > 0 ? endPages[0] - 2 : count - 1,
  )

  // Basic list of items to render
  // e.g. itemList = ['first', 'previous', 1, 'ellipsis', 4, 5, 6, 'ellipsis', 10, 'next', 'last']
  const itemList: ItemType[] = [
    ...(showFirstButton ? ['first' as const] : []),
    ...(hidePrevButton ? [] : ['previous' as const]),
    ...startPages,

    // Start ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsStart > boundaryCount + 2
      ? ['start-ellipsis' as const]
      : boundaryCount + 1 < count - boundaryCount
      ? [boundaryCount + 1]
      : []),

    // Sibling pages
    ...range(siblingsStart, siblingsEnd),

    // End ellipsis
    // eslint-disable-next-line no-nested-ternary
    ...(siblingsEnd < count - boundaryCount - 1
      ? ['end-ellipsis' as const]
      : count - boundaryCount > boundaryCount
      ? [count - boundaryCount]
      : []),

    ...endPages,
    ...(hideNextButton ? [] : ['next' as const]),
    ...(showLastButton ? ['last' as const] : []),
  ]

  // Map the button type to its page number
  const buttonPage = (type: ItemType) => {
    switch (type) {
      case 'first':
        return 1

      case 'previous':
        return page - 1

      case 'next':
        return page + 1

      case 'last':
        return count

      default:
        return page
    }
  }

  // Convert the basic item list to PaginationItem props objects
  const items = itemList.map((item) => {
    return typeof item === 'number'
      ? {
          onPress: (event: PressEvent) => {
            handlePress(event, item)
          },
          type: 'page',
          page: item,
          selected: item === page,
          disabled,
          'aria-current': item === page ? ('true' as const) : undefined,
        }
      : {
          onPress: (event: PressEvent) => {
            handlePress(event, buttonPage(item))
          },
          type: item,
          page: buttonPage(item),
          selected: false,
          disabled:
            disabled ||
            (!item.includes('ellipsis') &&
              (item === 'next' || item === 'last' ? page >= count : page <= 1)),
        }
  })

  return {
    items,
  }
}
