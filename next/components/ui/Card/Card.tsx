import cx from 'classnames'

import { Button } from '../Button/Button'

export interface CardProps {
  className?: string
  buttonPosition?: string
  hasButton?: boolean
  buttonContent?: string | React.ReactNode
  topImage?: React.ReactNode
  topImagePosition?: string
  children?: React.ReactNode
  buttonVariant?: 'default' | 'circle'
  onButtonClick?: () => void
}

export const Card = ({
  className,
  hasButton,
  topImage,
  topImagePosition,
  buttonPosition,
  children,
  buttonContent,
  buttonVariant,
  onButtonClick,
}: CardProps) => (
  <div className={cx(className, 'relative max-w-full bg-white shadow-lg rounded-lg')}>
    {topImage && <div className={cx(topImagePosition, 'absolute z-10')}>{topImage}</div>}
    {children}
    {hasButton && (
      <Button
        type="submit"
        className={cx(
          buttonPosition,
          'bg-secondary absolute bottom-0 transform translate-y-1/2',
          { 'w-12 h-12': buttonVariant === 'circle' },
          { 'py-2.5 px-6': buttonVariant === 'default' }
        )}
        shape={buttonVariant}
        variant="secondary-dark-text"
        onClick={onButtonClick}
      >
        <div className="text-20"> {buttonContent}</div>
      </Button>
    )}
  </div>
)

export default Card
