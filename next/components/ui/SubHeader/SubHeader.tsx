import 'react-sweet-progress/lib/style.css'

import { ArrowRight, ChevronRight } from '@assets/images'
import cx from 'classnames'
import { useState } from 'react'

import { Button } from '../Button/Button'
import { Link } from '../Link/Link'

export interface SubHeaderProps {
  className?: string
  buttonTitle?: string
  subButtonTitle?: string
  title?: React.ReactNode
  description?: React.ReactNode
  topper?: string
  href?: string
  subHref?: string
}

export const SubHeader = ({
  title,
  description,
  topper,
  className,
  buttonTitle,
  subButtonTitle,
  href,
  subHref,
}: SubHeaderProps) => {
  const [signInHover, setSignInHover] = useState(false)

  return (
    <div className={cx('z-10 flex flex-col', className)}>
      <p className="mt-4 mb-8 pt-0.5 pb-2 md:mt-6 md:mb-16 md:pt-0">{topper}</p>
      <span
        className={cx('font-bold text-2xl w-41 md:max-w-lg md:w-full', {
          'mb-8': !description,
        })}
      >
        {title}
      </span>
      {description && <span className="mt-3 mb-5 w-76 md:mb-10 md:w-full md:max-w-md">{description}</span>}
      {href && buttonTitle && (
        <Link href={href}>
          <Button className="h-12 p-2 text-default">{buttonTitle}</Button>
        </Link>
      )}
      {subHref && subButtonTitle && (
        <Link href={subHref} className="h-12 p-2 text-default" variant="plain">
          <div
            className="flex items-center gap-x-6 font-semibold"
            onMouseEnter={() => setSignInHover(true)}
            onMouseLeave={() => setSignInHover(false)}
          >
            <span className="py-0.5 underline">{subButtonTitle}</span>
            {signInHover ? <ArrowRight /> : <ChevronRight />}
          </div>
        </Link>
      )}
    </div>
  )
}

export default SubHeader
