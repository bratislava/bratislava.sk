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
      <p className="mb-8 mt-4 pb-2 pt-0.5 md:mb-16 md:mt-6 md:pt-0">{topper}</p>
      <span
        className={cx('text-h1 w-40 font-semibold md:w-full md:max-w-lg', {
          'mb-8': !description,
        })}
      >
        {title}
      </span>
      {description && (
        <span className="mb-5 mt-3 w-72 md:mb-10 md:w-full md:max-w-md">{description}</span>
      )}
      {href && buttonTitle && (
        <Link href={href}>
          <Button className="text-20 h-12 p-2">{buttonTitle}</Button>
        </Link>
      )}
      {subHref && subButtonTitle && (
        <Link href={subHref} className="text-20 h-12 p-2" variant="plain">
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
