import ChevronRight from '@assets/images/chevron-right.svg'
import Button, { ButtonProps } from '@components/forms/simple-components/Button'
import cx from 'classnames'

type VerticalCardButtonProps = ButtonProps & {
  size?: 'default' | 'medium' | 'large' | 'custom'
}

export const VerticalCardButton = ({ className, children, ...rest }: VerticalCardButtonProps) => (
  <Button
    variant="category"
    className={cx(
      'h-14 w-14 transform rounded-full transition-transform hover:scale-110',
      className,
    )}
    {...rest}
  >
    {children ?? <ChevronRight />}
  </Button>
)
