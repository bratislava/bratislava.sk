import cx from 'classnames'
import { useState } from 'react'
import { Button } from '../Button/Button'
import { Link } from '../Link/Link'
import { ArrowRight, ChevronRight } from '@assets/images'
import 'react-sweet-progress/lib/style.css'

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

export function SubHeader({
  title,
  description,
  topper,
  className,
  buttonTitle,
  subButtonTitle,
  href,
  subHref,
}: SubHeaderProps) {
  const [signInHover, setSignInHover] = useState(false)

  return (
    <div className={cx('z-10 flex flex-col', className)}>
      <p className="mt-4 pt-0.5 md:mt-6 md:pt-0 mb-8 md:mb-16 pb-2">{topper}</p>
      <span
        className={cx('font-bold text-2xl w-41 md:max-w-lg md:w-full', {
          'mb-8': !description,
        })}
      >
        {title}
      </span>
      {description && <span className="mt-3 mb-5 md:mb-10 w-76 md:max-w-md md:w-full">{description}</span>}
      {href && buttonTitle && (
        <Link href={href}>
          <Button className="h-12 text-default p-2">{buttonTitle}</Button>
        </Link>
      )}
      {subHref && subButtonTitle && (
        <Link href={subHref} className="h-12 text-default p-2" variant="plain">
          <div
            className="flex gap-x-6 items-center font-semibold"
            onMouseEnter={() => setSignInHover(true)}
            onMouseLeave={() => setSignInHover(false)}
          >
            <span className="underline py-0.5">{subButtonTitle}</span>
            {signInHover ? <ArrowRight /> : <ChevronRight />}
          </div>
        </Link>
      )}
    </div>
  )
}

export default SubHeader
