import React from 'react'

import { StarzLogoSvg } from '@/src/assets/images'
import MLink from '@/src/components/common/MLink/MLink'
import cn from '@/src/utils/cn'
import { CommonLinkProps } from '@/src/utils/getLinkProps'

export type StarzLogoProps = {
  variant: 'white' | 'dark-blue'
  linkProps?: CommonLinkProps
  className?: string
}

const StarzLogo = ({ linkProps, variant = 'dark-blue', className }: StarzLogoProps) => {
  const { children: ariaLabel, href, ...restLinkProps } = linkProps ?? {}

  return (
    <div
      className={cn(
        'relative box-content transition',
        {
          'text-starz-primary-700': variant === 'dark-blue',
          'hover:text-starz-primary-600 active:text-starz-primary-800':
            variant === 'dark-blue' && href,
          'text-content-active-primary-inverted-default': variant === 'white',
          'hover:text-content-active-primary-inverted-hover active:text-content-active-primary-inverted-pressed':
            variant === 'white' && href,
        },
        className,
      )}
    >
      {href ? (
        <MLink href={href} aria-label={ariaLabel?.toString()} {...restLinkProps} stretched>
          <StarzLogoSvg className="size-full" />
        </MLink>
      ) : (
        <StarzLogoSvg className="size-full" />
      )}
    </div>
  )
}

export default StarzLogo
