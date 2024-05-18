import cx from 'classnames'
import React from 'react'

import Button from '@/components/forms/simple-components/Button'
import NumericalListItem from '@/components/ui/NumericalList_Deprecated/NumericalListItem_Deprecated'
import Waves from '@/components/ui/Waves/Waves'

export type NumericalListItemObject = {
  text?: string | null
}

export type NumericalListProps = {
  title: string | null | undefined
  items: NumericalListItemObject[] | null | undefined
  hasBackground: boolean | null | undefined
  buttonText?: string | null | undefined
  buttonLink?: string | null | undefined
  variant?: 'basic' | 'combined' | 'roadmap'
}

const NumericalList = ({
  title,
  items,
  hasBackground,
  buttonText,
  buttonLink,
  variant = 'basic',
}: NumericalListProps) => {
  const href = buttonLink?.length ? buttonLink : '#'
  return (
    <div className={cx({ 'pt-14': hasBackground }, { 'pt-0': !hasBackground })}>
      {hasBackground && <Waves waveColor="rgb(var(--color-category-200))" wavePosition="top" />}

      <div
        className={cx('flex flex-col items-center justify-center py-12', {
          'bg-category-200': hasBackground,
        })}
      >
        <div className="flex max-w-screen-md flex-col">
          {title ? (
            <div
              className={cx(
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
              hasBackground={hasBackground ?? undefined}
            />
          ))}

          {/* <NumericalList items={items} hasBackground={hasBackground} variant={variant} /> */}
        </div>
        {variant !== 'roadmap' && buttonText && (
          <Button href={href} className="pt-10" variant="category-outline">
            {buttonText}
          </Button>
        )}
      </div>

      {hasBackground && <Waves waveColor="rgb(var(--color-category-200))" wavePosition="bottom" />}
    </div>
  )
}

export default NumericalList
