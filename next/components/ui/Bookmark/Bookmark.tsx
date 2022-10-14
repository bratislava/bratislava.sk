// @ts-strict-ignore
import cx from 'classnames'
import React, { useRef } from 'react'
import { useOutsideClick } from 'rooks'

import ChevronRight from '../../../assets/images/chevron-right.svg'
import CloseOutline from '../../../assets/images/close-outline.svg'
import { ArrowRight } from '../images'

const PADDING = 20 // py-5

export interface BookmarkLink {
  title?: string | null
  href?: string | null
}

// TODO add imageSrc ???

export interface BookmarkProps {
  className?: string
  bookmarkTitle?: string | null
  title?: string | null
  content?: string | null
  link: BookmarkLink
  variant?: 'blue' | 'red' | string | null
  icon?: string
  IconComponent?: React.FunctionComponent<React.SVGAttributes<any>>
}

export const Bookmark = ({
  className,
  bookmarkTitle,
  title,
  content,
  link,
  variant,
  // IconComponent,
  icon,
}: BookmarkProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const ref = React.useRef<HTMLSpanElement>(null)
  const [width, setWidth] = React.useState<number>()
  const [height, setHeight] = React.useState<number>()

  const modelref = useRef()
  useOutsideClick(ref, () => setIsOpen(false))

  // fallback to red if incorrect variant
  const variantWithFallback = variant === 'blue' || variant === 'red' ? variant : 'red'

  React.useEffect(() => {
    if (!ref.current) return

    setWidth(ref.current.offsetWidth)
    setHeight(ref.current.offsetHeight)
  }, [ref.current])

  const contentLoaded = width !== undefined && height !== undefined

  return (
    <div
      className={cx(className, 'flex rounded-l-lg overflow-hidden transition-all duration-500 ease-in-out', {
        'bg-blue-sea text-font': variantWithFallback === 'blue',
        'bg-red-brick text-white': variantWithFallback === 'red',
        'w-175': isOpen,
        'w-17.5 ml-157.5': !isOpen,
      })}
      style={{
        minHeight: contentLoaded ? width + 2 * PADDING : undefined,
      }}
      ref={modelref}
    >
      <button
        className={cx('w-17.5 font-semibold text-default', {
          'bg-blue-sea-dark': variantWithFallback === 'blue',
          'bg-red-brick-dark': variantWithFallback === 'red',
        })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="block w-17.5 origin-top-left translate-x-1/2 translate-y-1/2 -rotate-90 whitespace-nowrap">
          <span className="block w-max -translate-x-1/2 -translate-y-1/2 overflow-visible" ref={ref}>
            {bookmarkTitle}
          </span>
        </span>
      </button>

      <div className="flex py-5">
        <div className="flex w-44.5 items-center justify-center">
          {icon ? (
            <div
              style={{
                backgroundImage: `url("${icon}")`,
              }}
              className="h-24 w-24 rounded-full"
            />
          ) : (
            <div
              className={cx('w-24 h-24 rounded-full', {
                'bg-font': variantWithFallback === 'blue',
                'bg-white': variantWithFallback === 'red',
              })}
            />
          )}
        </div>

        <div className="flex w-80 flex-col justify-center">
          <h3 className="text-h4 leading-[36px]">{title}</h3>
          <p className="my-3">{content}</p>
          <a href={link.href} className="group flex items-center font-semibold underline">
            <span className="text-sm font-semibold">{link.title}</span>
            {/* <ChevronRight className="ml-6" /> */}
            <span className="ml-4 group-hover:hidden">
              <ChevronRight />
            </span>
            <span className="ml-4 hidden h-6 group-hover:block">
              <ArrowRight />
            </span>
          </a>
        </div>

        <div className="flex w-33 items-start justify-end pr-5">
          <button onClick={() => setIsOpen(false)}>
            <CloseOutline />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Bookmark

// TODO extract Circle as atom ???

// TODO NextLink !!! (in story book)
