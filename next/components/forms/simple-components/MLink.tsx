import cx from 'classnames'
import NextLink from 'next/link'
import { usePlausible } from 'next-plausible'
import { ComponentProps, forwardRef } from 'react'
import { twMerge } from 'tailwind-merge'

export type LinkPlausibleProps = { id: string }

export type LinkProps = Omit<ComponentProps<typeof NextLink>, 'as' | 'passHref'> & {
  variant?: 'unstyled' | 'underlineOnHover' | 'underlined' | 'underlined-medium'
  plausibleProps?: LinkPlausibleProps
  /**
   * Similar to this:
   * https://getbootstrap.com/docs/4.3/utilities/stretched-link/
   */
  stretched?: boolean
}

const MLink = forwardRef<HTMLAnchorElement, LinkProps>(
  (
    { href, children, className, variant = 'unstyled', stretched, plausibleProps, ...rest },
    ref,
  ) => {
    const plausible = usePlausible()

    const styles = twMerge(
      cx('underline-offset-2', {
        'underline lg:no-underline lg:hover:underline': variant === 'underlineOnHover',
        'underline hover:text-gray-600':
          variant === 'underlined' || variant === 'underlined-medium',
        'font-medium': variant === 'underlined-medium',

        // https://github.com/tailwindlabs/tailwindcss/issues/1041#issuecomment-957425345
        'after:absolute after:inset-0': stretched,
      }),
      className,
    )

    return (
      <NextLink
        href={href}
        passHref
        ref={ref}
        {...rest}
        className={styles}
        onClick={() => plausibleProps && plausible('Link click', { props: plausibleProps })}
      >
        {children}
      </NextLink>
    )
  },
)

export default MLink
