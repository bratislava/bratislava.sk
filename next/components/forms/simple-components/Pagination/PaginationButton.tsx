import { PressEvent } from '@react-types/shared'
import cx from 'classnames'
import { forwardRef, ReactNode, RefObject } from 'react'
import { useButton } from 'react-aria'

type PaginationButtonBase = {
  variant?: 'pagination-selected' | 'pagination'
  type?: 'button' | 'arrow'
  disabled?: boolean
  children: ReactNode
  onPress: (event: PressEvent) => void
}

const PaginationButton = forwardRef<HTMLButtonElement, PaginationButtonBase>(
  ({ type, variant = 'pagination', children, disabled, onPress }, ref) => {
    const { buttonProps } = useButton(
      {
        elementType: 'button',
        isDisabled: disabled,
        onPress,
      },
      ref as RefObject<HTMLButtonElement>,
    )
    return (
      <button
        type="button"
        ref={ref as RefObject<HTMLButtonElement>}
        className={cx(
          'flex justify-center items-center w-10 h-10 md:w-12 md:h-12 rounded-full outline-none',
          {
            'border-2 text-gray-700 hover:border-gray-700': variant === 'pagination',
            'bg-gray-700 text-white border-2 border-gray-700': variant === 'pagination-selected',
            'border-none': type === 'arrow',
          },
        )}
        {...buttonProps}
      >
        <span className="text-p2-semibold">{children}</span>
      </button>
    )
  },
)
export default PaginationButton
