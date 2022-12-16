import { useUIContext } from '@bratislava/common-frontend-ui-context'
import cx from 'classnames'

interface IProps {
  className?: string
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
  children?: React.ReactNode
  icon?: React.ReactNode
  hoverIcon?: React.ReactNode
  iconPosition?: 'right' | 'left'
  iconClassName?: string
  variant?: 'primary' | 'plain'
}

export const Link = ({
  className,
  href,
  target,
  children,
  icon,
  hoverIcon: iHoverIcon,
  iconPosition,
  iconClassName,
  variant = 'primary',
}: IProps) => {
  const { Link: UILink } = useUIContext()

  const hasIcon = !!icon
  const hasIconLeft = hasIcon && iconPosition === 'left'
  const hasIconRight = hasIcon && iconPosition === 'right'

  const hoverIcon = iHoverIcon || icon

  return (
    <UILink className={className} href={href} target={target}>
      <div
        className={cx('group flex items-center cursor-pointer', {
          'text-category-600 font-medium': variant === 'primary',
        })}
      >
        <span className="group-hover:hidden">{hasIconLeft && icon}</span>
        <span className="hidden group-hover:block">{hasIconLeft && hoverIcon}</span>
        <span
          className={cx(iconClassName, {
            'pl-6': hasIconLeft,
            'pr-6': hasIconRight,
          })}
        >
          {children}
        </span>
        <span className="group-hover:hidden">{hasIconRight && icon}</span>
        <span className="hidden group-hover:block">{hasIconRight && hoverIcon}</span>
      </div>
    </UILink>
  )
}

export default Link
