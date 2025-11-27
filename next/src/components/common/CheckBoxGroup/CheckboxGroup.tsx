import { useState } from 'react'
import {
  CheckboxGroup as RACCheckboxGroup,
  CheckboxGroupProps as RACCheckboxGroupProps,
  Label as RACLabel,
} from 'react-aria-components'

import Button from '@/src/components/common/Button/Button'
import Checkbox from '@/src/components/common/CheckBoxGroup/Checkbox'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import { useTranslation } from '@/src/utils/useTranslation'

type CheckboxGroupItems = {
  label: string
  value: string
}[]

type Props = RACCheckboxGroupProps & {
  label: string
  items: CheckboxGroupItems
  initialDisplayCount?: number
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16717-20068&t=dOg5br7HlXCsYQKD-4
 * Based on RAC library: https://react-spectrum.adobe.com/react-aria/CheckboxGroup.html
 */

const CheckboxGroup = ({
  label,
  value,
  items,
  initialDisplayCount = 8,
  onChange,
  ...restProps
}: Props) => {
  const { t } = useTranslation()

  const [displayedItemsCount, setDisplayedItemsCount] = useState(initialDisplayCount)

  return (
    <RACCheckboxGroup
      className="flex flex-col gap-2"
      value={value}
      onChange={onChange}
      {...restProps}
    >
      <RACLabel className="font-semibold">{label}</RACLabel>
      <div className="flex flex-col gap-4 rounded-lg border border-border-passive-primary px-4 py-5">
        <div className="flex flex-col gap-3">
          {items.slice(0, displayedItemsCount).map((item) => {
            return (
              <Checkbox key={item.value} value={item.value}>
                {item.label}
              </Checkbox>
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
