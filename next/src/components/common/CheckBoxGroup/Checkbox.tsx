import { Checkbox as RACCheckbox, CheckboxProps as RACCheckboxProps } from 'react-aria-components'

import { CheckIcon } from '@/src/assets/icons'
import cn from '@/src/utils/cn'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16717-20069&t=nFl2Kvs9pZLewXiT-4
 * Based on RAC library: https://react-spectrum.adobe.com/react-aria/Checkbox.html
 */

const Checkbox = ({ children, value, ...restProps }: RACCheckboxProps) => {
  return (
    <RACCheckbox
      key={value}
      value={value}
      className={({ isHovered, isDisabled }) => {
        return cn(
          'base-focus-ring flex items-center gap-3 rounded-sm',
          {
            'text-content-active-primary-hover': isHovered,
            'text-content-active-primary-disabled': isDisabled,
          },
          // position:relative prevents modal to jump beyond viewport when checkbox is focused
          // https://github.com/carbon-design-system/carbon/issues/7682
          'relative',
        )
      }}
      {...restProps}
    >
      {({ isSelected, isHovered, isDisabled }) => {
        return (
          <>
            <div
              className={cn(
                'flex size-6 shrink-0 items-center justify-center rounded-md border-[2px] border-border-active-primary-default text-content-passive-inverted-primary',
                {
                  'border-border-active-primary-hover': isHovered,
                  'bg-background-active-primary-default': isSelected,
                  'bg-background-active-primary-hover': isSelected && isHovered,
                  'border-border-active-primary-disabled': isDisabled,
                  'bg-background-active-primary-disabled': isSelected && isDisabled,
                },
              )}
            >
              {isSelected && <CheckIcon aria-hidden />}
            </div>
            {children}
          </>
        )
      }}
    </RACCheckbox>
  )
}

export default Checkbox
