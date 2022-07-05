import { ArrowRight, ChevronRight } from '@assets/images'
import Button from '../Button/Button'
import { NumericalListItem } from '../NumericalListItem/NumericalListItem'
import Waves from '../Waves/Waves'
import cx from 'classnames'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { NumericalList } from '../NumericalList/NumericalList'

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
      {hasBackground ? 
        <Waves
        waveColor={cx({ 'var(--secondary-color)': hasBackground }, { 'var(--background-color)': !hasBackground })}
        wavePosition={'top'}
        isRich
        backgroundColor="var(--background-color)"
      />
      : ""}
      
      <div
        className={cx(
          'flex justify-center flex-col items-center py-12',
          { 'bg-secondary': hasBackground },
          { 'bg-background': !hasBackground }
        )}
      >
        <div className="flex flex-col max-w-3xl">
          { title? <div
            className={cx(
              'text-center pb-14 font-semibold',
              { 'text-default lg:text-lg': variant != 'roadmap' },
              { 'text-md': variant === 'roadmap' }
            )}
          >
            {title}
          </div>: ""}
          
          <NumericalList items={items} hasBackground={hasBackground} variant={variant} />
        </div>
        {variant != 'roadmap' && buttonText && (
          <UILink href={href}>
            <Button
              className="bg-primary border-primary text-base h-12 lg:text-default lg:h-14 px-6 z-10"
              variant="secondaryDarkText"
              icon={<ChevronRight />}
              hoverIcon={<ArrowRight />}
            >
              {buttonText}
            </Button>
          </UILink>
        )}
      </div>
      {hasBackground ? 
        <Waves
        waveColor={cx({ 'var(--secondary-color)': hasBackground }, { 'var(--background-color)': !hasBackground })}
        wavePosition={'bottom'}
        isRich
        backgroundColor="var(--background-color)"
      />
      : ""}
      
    </div>
  )
}
