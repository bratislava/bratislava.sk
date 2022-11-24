import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

import Button from '../Button/Button'
import { NumericalList } from '../NumericalList/NumericalList'
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
    <div className={cx({ 'pt-14': hasBackground }, { 'pt-0': !hasBackground })}>
      {hasBackground ? (
        <Waves
          waveColor={cx({ 'var(--category-color-200)': hasBackground })}
          wavePosition="top"
          isRich
        />
      ) : null}

      <div
        className={cx('flex justify-center flex-col items-center py-12', {
          'bg-category-200': hasBackground,
        })}
      >
        <div className="flex max-w-3xl flex-col">
          {title ? (
            <div
              className={cx(
                'text-center pb-14',
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
          <UILink href={href} className="pt-10">
            <Button
              className="text-base lg:text-default z-10 h-12 border-category-600 bg-category-600 px-6 lg:h-14"
              variant="secondary-dark-text"
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
          waveColor={cx({ 'var(--category-color-200)': hasBackground })}
          wavePosition="bottom"
          isRich
        />
      ) : null}
    </div>
  )
}
