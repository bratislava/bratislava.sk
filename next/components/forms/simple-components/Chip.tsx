import cx from 'classnames'
import { Tag, TagProps } from 'react-aria-components'

interface ChipProps extends TagProps {
  variant?: 'large' | 'small'
  className?: string
}

/*
/* FIGMA: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?node-id=10277%3A26616&mode=dev
/* For Chips to be responsive, we don't have three separate variants as in style guide, but only two which respond to window size.
 */

const Chip = ({ variant = 'large', className, ...props }: ChipProps) => {
  return (
    <Tag
      {...props}
      className={cx(
        'flex cursor-pointer items-center rounded-lg border-2 hover:bg-gray-200 selected:border-category-700 selected:bg-category-700 selected:text-gray-0 hover:selected:bg-category-700',
        className,
        {
          'px-3 py-1.5 text-size-p-small lg:px-4 lg:py-2.5 lg:text-size-p-default':
            variant === 'large',
          'px-2 text-size-p-small lg:px-3 lg:py-1.5': variant === 'small',
        },
      )}
    />
  )
}

export default Chip
