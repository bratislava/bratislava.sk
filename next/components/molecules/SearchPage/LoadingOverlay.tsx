import cx from 'classnames'
import React, { PropsWithChildren } from 'react'

import { LoadingSpinner } from '../../ui'

type LoadingOverlayProps = {
  loading: boolean
}

/**
 * An element that acts like padding, but is shrunk when div changes its height.
 *
 * 80px - half of the height of spinner + loading text
 */
const ShrinkablePadding = () => <div className="h-20 min-h-[50%-80] shrink" />

const LoadingOverlay = ({ loading, children }: PropsWithChildren<LoadingOverlayProps>) => {
  return (
    // 160px - height of spinner
    <div className={cx('relative', { 'min-h-[160]': loading })}>
      {loading ? (
        <div className="absolute top-0 left-0 flex h-full w-full flex-col items-center text-white/80">
          <ShrinkablePadding />
          {/* For some reason it displays behind aspect-w-* elements, so z-index is added. */}
          <LoadingSpinner className="z-10 shrink-0 text-white" />
          <ShrinkablePadding />
        </div>
      ) : null}
      {children}
    </div>
  )
}

export default LoadingOverlay
