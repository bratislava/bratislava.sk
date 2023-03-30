import cx from 'classnames'
import Link from 'next/link'
import { ComponentProps, forwardRef, ReactNode } from 'react'
import { twMerge } from 'tailwind-merge'

export type LinkProps = Omit<ComponentProps<typeof Link>, 'as' | 'passHref'> & {
  children: ReactNode
  variant?: 'unstyled' | 'underlineOnHover' | 'navBarHeader' | 'breadcrumbs'
  /**
   * Similar to this:
   * https://getbootstrap.com/docs/4.3/utilities/stretched-link/
   */
  stretched?: boolean
  className?: string
  label?: string
  href?: string
}

const MLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, label, children, className, variant = 'unstyled', stretched, ...rest }, ref) => {
    const regEx = /^http/

    const styles = twMerge(
      cx('underline-offset-2', {
        'underline lg:no-underline lg:hover:underline': variant === 'underlineOnHover',
        'underline hover:text-gray-600 font-medium': variant === 'navBarHeader',
        underline: variant === 'breadcrumbs',

        // https://github.com/tailwindlabs/tailwindcss/issues/1041#issuecomment-957425345
        'after:absolute after:inset-0': stretched,
      }),
      className,
    )

    return !regEx.test(href) ? (
      <Link href={href} passHref ref={ref} {...rest} className={styles}>
        <span>{label}</span>
        {children}
      </Link>
    ) : (
      <a ref={ref} {...rest} className={styles} href={href}>
        <span>{label}</span>
        {children}
      </a>
    )
  },
)

export default MLink
