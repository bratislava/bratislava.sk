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

// TODO to be removed when NewsLetter is refactored
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
  <div className={cx(className, 'relative max-w-full rounded-lg bg-white shadow-lg')}>
    {topImage && <div className={cx(topImagePosition, 'absolute z-10')}>{topImage}</div>}
    {children}
    {hasButton && (
      <Button
        type="submit"
        className={cx(
          buttonPosition,
          'absolute bottom-0 translate-y-1/2 transform bg-category-200',
          { 'h-12 w-12': buttonVariant === 'circle' },
          { 'px-6 py-2.5': buttonVariant === 'default' },
        )}
        shape={buttonVariant}
        variant="secondary-dark-text"
        onClick={onButtonClick}
      >
        <div className="text-large"> {buttonContent}</div>
      </Button>
    )}
  </div>
)

export default Card
