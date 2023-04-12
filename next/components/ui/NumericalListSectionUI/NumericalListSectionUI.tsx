import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Button } from '@bratislava/ui-bratislava/Button/Button'
import { Waves } from '@bratislava/ui-bratislava/Waves/Waves'
import cx from 'classnames'

import { NumericalList } from '../NumericalList/NumericalList'

export interface NumericalListItemObject {
  text?: string | null
}

export interface NumericalListSectionProps {
  title: string | null | undefined
  items: NumericalListItemObject[] | null | undefined
  hasBackground: boolean | null | undefined
  buttonText?: string | null | undefined
  buttonLink?: string | null | undefined
  variant?: 'basic' | 'combined' | 'roadmap'
}

export const NumericalListSectionUI = ({
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
          <UILink href={href} className="pt-10">
            <Button
              className="text-p1 z-10 h-12 border-category-600 bg-category-600 px-6 lg:h-14"
              variant="secondary-dark-text"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              {buttonText}
            </Button>
          </UILink>
        )}
      </div>

      {hasBackground && <Waves waveColor="rgb(var(--color-category-200))" wavePosition="bottom" />}
    </div>
  )
}
