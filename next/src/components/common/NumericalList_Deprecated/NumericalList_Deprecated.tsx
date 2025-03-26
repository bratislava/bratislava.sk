import React from 'react'

import Button from '@/src/components/common/Button/Button'
import NumericalListItem from '@/src/components/common/NumericalList_Deprecated/NumericalListItem_Deprecated'
import cn from '@/src/utils/cn'

export type NumericalListItemObject = {
  text?: string | null
}

export type NumericalListProps = {
  title: string | null | undefined
  items: NumericalListItemObject[] | null | undefined
  buttonText?: string | null | undefined
  buttonLink?: string | null | undefined
  variant?: 'basic' | 'combined' | 'roadmap'
}

const NumericalList = ({
  title,
  items,
  buttonText,
  buttonLink,
  variant = 'basic',
}: NumericalListProps) => {
  const href = buttonLink?.length ? buttonLink : '#'

  return (
    <div>
      <div className="flex flex-col items-center justify-center py-12">
        <div className="flex max-w-screen-md flex-col">
          {title ? (
            <div
              className={cn(
                'pb-14 text-center',
                { 'text-h3': variant !== 'roadmap' },
                { 'text-h4': variant === 'roadmap' },
              )}
            >
              {title}
            </div>
          ) : null}

          {items?.map((item, index) => (
            <NumericalListItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
              item={item}
              variant={variant}
            />
          ))}
        </div>
        {variant !== 'roadmap' && buttonText && (
          <Button href={href} className="pt-10" variant="category-outline">
            {buttonText}
          </Button>
        )}
      </div>
    </div>
  )
}

export default NumericalList
