import { useState } from 'react'
import {
  Checkbox as RACCheckbox,
  CheckboxGroup as RACCheckboxGroup,
  CheckboxGroupProps as RACCheckboxGroupProps,
  Label as RACLabel,
} from 'react-aria-components'

import { CheckIcon } from '@/src/assets/icons'
import Button from '@/src/components/common/Button/Button'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

type CheckboxGroupOptions = {
  label: string
  value: string
}[]

type Props = Pick<RACCheckboxGroupProps, 'value' | 'onChange'> & {
  label: string
  items: CheckboxGroupOptions
  initialDisplayCount?: number
}
/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16717-20068&t=dOg5br7HlXCsYQKD-4
 *
 * TODO focus ring now travels through every checkbox on tab - consider making this skippable as in TagGroup
 */

const CheckboxGroup = ({ label, value, items, initialDisplayCount = 8, onChange }: Props) => {
  const { t } = useTranslation()

  const [displayedItemsCount, setDisplayedItemsCount] = useState(initialDisplayCount)

  return (
    <RACCheckboxGroup className="flex flex-col gap-2" value={value} onChange={onChange}>
      <RACLabel className="font-semibold">{label}</RACLabel>
      <div className="flex flex-col gap-4 rounded-lg border border-border-passive-primary px-4 py-5">
        <div className="flex flex-col gap-3">
          {items.slice(0, displayedItemsCount).map((item) => {
            return (
              <RACCheckbox
                key={item.value}
                value={item.value}
                className={({ isHovered }) => {
                  return cn('base-focus-ring flex items-center gap-3 rounded-sm', {
                    'text-content-active-primary-hover': isHovered,
                  })
                }}
              >
                {({ isSelected, isHovered, isDisabled }) => {
                  return (
                    <>
                      <div
                        className={cn(
                          'flex size-6 shrink-0 items-center justify-center rounded-md border-[0.2rem] border-border-active-primary-default text-content-passive-inverted-primary',
                          {
                            'border-border-active-primary-hover': isHovered,
                            'bg-background-active-primary-default': isSelected,
                            'bg-background-active-primary-hover': isSelected && isHovered,
                            'border-border-active-disabled': isDisabled,
                          },
                        )}
                        aria-hidden
                      >
                        {isSelected && <CheckIcon />}
                      </div>
                      {item.label}
                    </>
                  )
                }}
              </RACCheckbox>
            )
          })}
        </div>
        {items.length > initialDisplayCount && items.length !== displayedItemsCount ? (
          <>
            <HorizontalDivider />
            <Button
              variant="plain"
              onPress={() => {
                setDisplayedItemsCount(items.length)
              }}
              fullWidth
            >
              {t('CheckboxGroup.showMore')}
            </Button>
          </>
        ) : null}
      </div>
    </RACCheckboxGroup>
  )
}

export default CheckboxGroup
