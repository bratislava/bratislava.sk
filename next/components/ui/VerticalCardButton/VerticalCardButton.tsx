import ChevronRight from '@assets/images/chevron-right.svg'
import cx from 'classnames'

import { Button, ButtonProps } from '../Button/Button'

type VerticalCardButtonProps = ButtonProps & {
  size?: 'default' | 'medium' | 'large' | 'custom'
}

export const VerticalCardButton = ({
  className,
  children,
  size = 'default',
  ...rest
}: VerticalCardButtonProps) => (
  <Button
    className={cx(
      'transform transition-transform hover:scale-110',
      {
        'h-12 w-12': size === 'default',
        'h-14 w-14': size === 'medium',
        'h-16 w-16': size === 'large',
      },
      className,
    )}
    variant="muted"
    shape="circle"
    {...rest}
  >
    {children ?? <ChevronRight />}
  </Button>
)
