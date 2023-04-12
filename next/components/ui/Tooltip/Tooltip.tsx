import cx from 'classnames'
import React from 'react'

interface TooltipProps {
  className?: string
  content: React.ReactNode
  target?: React.ReactNode
  size?: 'large' | 'small'
  variant?: 'default' | 'primary'
}

interface IProps {
  variant: 'primary' | 'default'
}

export const TooltipTarget = ({ variant }: IProps) => (
  <div
    className={cx('text-p2 relative inline-block h-6 w-6 rounded-3xl', {
      'bg-category-200 text-category-600': variant === 'default',
      'bg-category-600 text-white': variant === 'primary',
    })}
  >
    ?
  </div>
)

export const Tooltip = ({
  className,
  content,
  target,
  size = 'small',
  variant = 'default',
}: TooltipProps) => (
  <div className={cx(className, 'flex w-6 flex-col')}>
    <div className="group relative flex cursor-help items-center justify-center text-center">
      {target || <TooltipTarget variant={variant} />}
      <div
        className={cx(
          className,
          'text-p3 pointer-events-none absolute right-full z-10 mr-2 rounded-lg p-2 opacity-0 group-hover:opacity-100 md:bottom-full md:right-auto md:mb-2 md:mr-0',
          {
            'w-56': size === 'small',
            'w-80': size === 'large',
            'bg-category-200 text-category-200': variant === 'default',
            'bg-category-600 text-category-600': variant === 'primary',
          },
        )}
      >
        <p
          className={cx({
            'text-white': variant === 'primary',
            'text-font': variant === 'default',
          })}
        >
          {content}
        </p>
        {/* desktop arrow */}
        <div className="absolute left-0 top-full hidden h-1 w-full items-center justify-center md:flex">
          <svg className="h-1" x="0" y="0" viewBox="0 0 20 10" xmlSpace="preserve">
            <polygon className="fill-current" points="0,0 10,10 20,0" />
          </svg>
        </div>
        {/* mobile arrow */}
        <div className="absolute left-full top-0 flex h-full w-1 items-center justify-center md:hidden">
          <svg x="0" y="0" viewBox="0 0 10 20" xmlSpace="preserve">
            <polygon className="fill-current" points="0,0 10,10 0,20" />
          </svg>
        </div>
      </div>
    </div>
  </div>
)

export default Tooltip
