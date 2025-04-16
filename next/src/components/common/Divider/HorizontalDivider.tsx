import React from 'react'

import cn from '@/src/utils/cn'

type HorizontalDividerProps = {
  categoryColor?: boolean
  className?: string
  asListItem?: boolean
}

const HorizontalDivider = ({ categoryColor, className, asListItem }: HorizontalDividerProps) => {
  const styles = cn(
    'border-b-2',
    { 'border-category-600': categoryColor, 'border-grey-200': !categoryColor },
    className,
  )

  return asListItem ? (
    <li role="separator" className={styles} />
  ) : (
    <div role="separator" className={styles} />
  )
}

export default HorizontalDivider
