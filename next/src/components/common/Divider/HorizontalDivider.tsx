import React from 'react'

import cn from '@/src/utils/cn'

type HorizontalDividerProps = {
  className?: string
  asListItem?: boolean
}

const HorizontalDivider = ({ className, asListItem }: HorizontalDividerProps) => {
  const styles = cn('border-b border-border-passive-primary', className)

  return asListItem ? (
    <li role="separator" className={styles} />
  ) : (
    <div role="separator" className={styles} />
  )
}

export default HorizontalDivider
