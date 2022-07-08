import cx from 'classnames'

import ChevronRight from '../../../assets/images/chevron-right.svg'
import { Button, ButtonProps } from '../Button/Button'

type VerticalCardButtonProps = ButtonProps & {
  size?: 'default' | 'medium' | 'large' | 'custom'
}

export const VerticalCardButton = ({ className, children, size = 'default', ...rest }: VerticalCardButtonProps) => (
  <Button
    className={cx(
      'transition-transform transform hover:scale-110',
      {
        'w-12 h-12': size === 'default',
        'w-14 h-14': size === 'medium',
        'w-16 h-16': size === 'large',
      },
      className
    )}
    variant="muted"
    shape="circle"
    {...rest}
  >
    {children ?? <ChevronRight />}
  </Button>
)
