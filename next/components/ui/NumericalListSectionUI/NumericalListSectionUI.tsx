import Waves from '@bratislava/ui-bratislava/Waves/Waves'
import cx from 'classnames'
import React from 'react'

import Button from '@/components/forms/simple-components/Button'

import NumericalList from '../NumericalList/NumericalList'

export type NumericalListItemObject = {
  text?: string | null
}

export type NumericalListSectionProps = {
  title: string | null | undefined
  items: NumericalListItemObject[] | null | undefined
  hasBackground: boolean | null | undefined
  buttonText?: string | null | undefined
  buttonLink?: string | null | undefined
  variant?: 'basic' | 'combined' | 'roadmap'
}

const NumericalListSectionUI = ({
  title,
  items,
  hasBackground,
  buttonText,
  buttonLink,
  variant = 'basic',
}: NumericalListSectionProps) => {
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

          <NumericalList items={items} hasBackground={hasBackground} variant={variant} />
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

export default NumericalListSectionUI
