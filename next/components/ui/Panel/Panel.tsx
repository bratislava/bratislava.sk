import cx from 'classnames'
import React from 'react'

export interface PanelProps extends React.HTMLAttributes<HTMLDivElement> {
  hoverable?: boolean
  overflowVisible?: boolean
}

export const Panel = ({ className, hoverable = false, overflowVisible = false, ...rest }: PanelProps) => (
  <div
    className={cx(className, 'rounded-lg', {
      'cursor-pointer transition-all transform hover:-translate-y-2': hoverable,
      'overflow-hidden': !overflowVisible,
    })}
    {...rest}
  />
)

export default Panel
