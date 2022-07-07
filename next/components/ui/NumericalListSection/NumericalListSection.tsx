import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import Button from '../Button/Button'
import { NumericalList } from '../NumericalList/NumericalList'
import { NumericalListItem } from '../NumericalListItem/NumericalListItem'
import Waves from '../Waves/Waves'

export interface NumericalListItemObject {
  text?: string
}

export interface NumericalListSectionProps {
  title: string
  items: NumericalListItemObject[]
  hasBackground: boolean
  buttonText?: string
  buttonLink?: string
  variant?: 'basic' | 'combined' | 'roadmap'
}

export const NumericalListSection = ({
  title,
  items,
  hasBackground,
  buttonText,
  buttonLink,
  variant = 'basic',
}: NumericalListSectionProps) => {
  const { Link: UILink } = useUIContext()
  const href = buttonLink?.length ? buttonLink : '#'
  return (
    <div className="pt-14">
      {hasBackground ? (
        <Waves
          waveColor={cx({ 'var(--secondary-color)': hasBackground }, { 'var(--background-color)': !hasBackground })}
          wavePosition="top"
          isRich
          backgroundColor="var(--background-color)"
        />
      ) : (
        ''
      )}

      <div
        className={cx(
          'flex justify-center flex-col items-center py-12',
          { 'bg-secondary': hasBackground },
          { 'bg-background': !hasBackground }
        )}
      >
        <div className="flex max-w-3xl flex-col">
          {title ? (
            <div
              className={cx(
                'text-center pb-14 font-semibold',
                { 'text-default lg:text-lg': variant != 'roadmap' },
                { 'text-md': variant === 'roadmap' }
              )}
            >
              {title}
            </div>
          ) : (
            ''
          )}

          <NumericalList items={items} hasBackground={hasBackground} variant={variant} />
        </div>
        {variant != 'roadmap' && buttonText && (
          <UILink href={href}>
            <Button
              className="z-10 h-12 border-primary bg-primary px-6 text-base lg:h-14 lg:text-default"
              variant="secondaryDarkText"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              {buttonText}
            </Button>
          </UILink>
        )}
      </div>
      {hasBackground ? (
        <Waves
          waveColor={cx({ 'var(--secondary-color)': hasBackground }, { 'var(--background-color)': !hasBackground })}
          wavePosition="bottom"
          isRich
          backgroundColor="var(--background-color)"
        />
      ) : (
        ''
      )}
    </div>
  )
}
