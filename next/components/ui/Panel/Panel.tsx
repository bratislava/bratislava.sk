import cx from 'classnames'
import React from 'react'

export type PanelProps = React.HTMLAttributes<HTMLDivElement> & {
  hoverable?: boolean
  overflowVisible?: boolean
}

const Panel = ({ className, hoverable = false, overflowVisible = false, ...rest }: PanelProps) => (
  <div
    // TODO added bg-white shadow class back in. We should find why it was there in first place.
    className={cx(className, 'rounded-lg bg-white shadow', {
      'transform cursor-pointer transition-all hover:-translate-y-2': hoverable,
      'overflow-hidden': !overflowVisible,
    })}
    {...rest}
  />
)

export default Panel
