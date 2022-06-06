import cx from 'classnames';
import React from 'react';

interface TooltipProps {
  className?: string;
  content: React.ReactNode;
  target?: React.ReactNode;
  size?: 'large' | 'small';
  variant?: 'default' | 'primary';
}

export const Tooltip = ({
  className,
  content,
  target,
  size = 'small',
  variant = 'default',
}: TooltipProps) => (
  <div className={cx(className, 'flex flex-col w-6')}>
    <div className="relative flex items-center justify-center text-center group cursor-help">
      {target || <TooltipTarget variant={variant} />}
      <div
        className={cx(
          className,
          'absolute text-xs rounded-lg p-2 z-10 right-full mr-2 md:right-auto md:mb-2 md:mr-0 md:bottom-full pointer-events-none opacity-0 group-hover:opacity-100',
          {
            'w-56': size === 'small',
            'w-80': size === 'large',
            'text-secondary bg-secondary': variant === 'default',
            'text-primary bg-primary': variant === 'primary',
          }
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
        <div className="hidden md:flex absolute w-full left-0 top-full h-1 items-center justify-center">
          <svg
            className="h-1"
            x="0"
            y="0"
            viewBox="0 0 20 10"
            xmlSpace="preserve"
          >
            <polygon className="fill-current" points="0,0 10,10 20,0" />
          </svg>
        </div>
        {/* mobile arrow */}
        <div className="flex md:hidden absolute left-full h-full top-0 w-1 items-center justify-center">
          <svg x="0" y="0" viewBox="0 0 10 20" xmlSpace="preserve">
            <polygon className="fill-current" points="0,0 10,10 0,20" />
          </svg>
        </div>
      </div>
    </div>
  </div>
);

interface IProps {
  variant: 'primary' | 'default';
}

export const TooltipTarget = ({ variant }: IProps) => (
  <div
    className={cx('text-sm w-6 h-6 rounded-3xl relative inline-block', {
      'bg-secondary text-primary': variant === 'default',
      'bg-primary text-white': variant === 'primary',
    })}
  >
    ?
  </div>
);

export default Tooltip;
