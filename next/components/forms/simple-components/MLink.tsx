import Link from 'next/link'
import { ComponentProps, forwardRef, ReactNode } from 'react'

export type LinkProps = Omit<ComponentProps<typeof Link>, 'as' | 'passHref'> & {
  children: ReactNode
  className?: string
  label?: string
  href?: string
}

const MLink = forwardRef<HTMLAnchorElement, LinkProps>(
  ({ href, label, children, className, ...rest }, ref) => {
    const regEx = /^http/

    return !regEx.test(href) ? (
      <Link href={href} passHref ref={ref} {...rest} className={className}>
        <p>{label}</p>
        {children}
      </Link>
    ) : (
      <a ref={ref} {...rest} className={className} href={href}>
        <p>{label}</p>
        {children}
      </a>
    )
  },
)

export default MLink
