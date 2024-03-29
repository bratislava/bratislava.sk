import HorizontalArrowIcon from '@assets/images/forms/tooltip-horizontal-arrow.svg'
import VerticalArrowIcon from '@assets/images/forms/tooltip-vertical-arrow.svg'
import Markdown from '@components/atoms/Markdown'
import cx from 'classnames'

type TooltipBase = {
  text?: string
  arrow?: boolean
  className?: string
  position?:
    | 'top-right'
    | 'top-left'
    | 'bottom-right'
    | 'bottom-left'
    | 'right-top'
    | 'right-bottom'
    | 'left-top'
    | 'left-bottom'
}

const TooltipPopup = ({ arrow = true, className, text, position = 'top-left' }: TooltipBase) => {
  const tooltipPopupStyle = cx('absolute z-20 w-fit', {
    'bottom-8 -left-3.5 sm:bottom-9 sm:-left-3': position === 'top-right',
    'bottom-8 -right-3.5 sm:bottom-9 sm:-right-3': position === 'top-left',
    'top-8 -left-3.5 sm:top-9 sm:-left-3': position === 'bottom-right',
    'top-8 -right-3.5 sm:top-9 sm:-right-3': position === 'bottom-left',

    'left-8 -top-3.5 sm:left-9 sm:-top-3': position === 'right-top',
    'left-8 -bottom-3.5 sm:left-9 sm:-bottom-3': position === 'right-bottom',
    'right-8 -top-3.5 sm:right-9 sm:-top-3': position === 'left-top',
    'right-8 -bottom-3.5 sm:right-9 sm:-bottom-3': position === 'left-bottom',
  })

  const tooltipArrowStyle = cx('absolute', {
    'left-4 w-4 h-2': position === 'top-right',
    'right-4 w-4 h-2': position === 'top-left',
    'left-4 top-[-7px] w-4 h-2': position === 'bottom-right',
    'right-4 top-[-7px] w-4 h-2': position === 'bottom-left',

    '-left-[7px] top-4 w-2 h-4': position === 'right-top',
    '-left-[7px] bottom-4 w-2 h-4': position === 'right-bottom',
    '-right-[7px] top-4 w-2 h-4': position === 'left-top',
    '-right-[7px] bottom-4 w-2 h-4': position === 'left-bottom',
  })

  return (
    <div className={tooltipPopupStyle}>
      <div
        className={cx(
          'text-small sm:text-default z-20 m-0 flex w-fit min-w-[118px] max-w-[230px] flex-row justify-center break-words rounded border-0 bg-gray-700 px-3 py-2 text-white sm:max-w-[280px] sm:px-4 sm:py-3',
          className,
        )}
      >
        <div className="w-max">
          {/* TODO may need smaller/condensed styles for markdown */}
          <Markdown content={text} />
        </div>
      </div>
      {arrow && (
        <span className={tooltipArrowStyle}>
          {(position === 'top-left' ||
            position === 'top-right' ||
            position === 'bottom-left' ||
            position === 'bottom-right') && (
            <VerticalArrowIcon
              className={cx({
                'rotate-180': position === 'top-right' || position === 'top-left',
                'rotate-0': position === 'bottom-right' || position === 'bottom-left',
              })}
            />
          )}
          {(position === 'right-top' ||
            position === 'right-bottom' ||
            position === 'left-top' ||
            position === 'left-bottom') && (
            <HorizontalArrowIcon
              className={cx({
                'rotate-0': position === 'right-top' || position === 'right-bottom',
                'rotate-180': position === 'left-top' || position === 'left-bottom',
              })}
            />
          )}
        </span>
      )}
    </div>
  )
}

export default TooltipPopup
