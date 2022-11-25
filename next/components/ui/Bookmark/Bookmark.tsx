// @ts-strict-ignore
import cx from 'classnames'
import React, { useRef } from 'react'
import { useOutsideClick } from 'rooks'

import ChevronRight from '../../../assets/images/chevron-right.svg'
import CloseOutline from '../../../assets/images/close-outline.svg'
import { ArrowRight } from '../images'

const PADDING = 20 // py-5

export interface BookmarkLink {
  title: string | null | undefined
  href: string | null | undefined
}

// TODO add imageSrc ???

export interface BookmarkProps {
  className?: string
  bookmarkTitle: string | null | undefined
  title: string | null | undefined
  content: string | null | undefined
  link: BookmarkLink
  variant?: 'blue' | 'red' | string | null
  icon?: string | null
  IconComponent?: React.FunctionComponent<React.SVGAttributes<any>>
}

const VARIANT_COLOR_FALLBACK = 'red'

export const Bookmark = ({
  className,
  bookmarkTitle,
  title,
  content,
  link,
  variant = VARIANT_COLOR_FALLBACK,
  // IconComponent,
  icon,
}: BookmarkProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const ref = React.useRef<HTMLSpanElement>(null)
  const [width, setWidth] = React.useState<number>()
  const [height, setHeight] = React.useState<number>()

  const modelref = useRef()
  useOutsideClick(ref, () => setIsOpen(false))

  React.useEffect(() => {
    if (!ref.current) return

    setWidth(ref.current.offsetWidth)
    setHeight(ref.current.offsetHeight)
  }, [ref.current])

  const contentLoaded = width !== undefined && height !== undefined

  return (
    <div
      className={cx(
        className,
        'flex rounded-l-lg overflow-hidden transition-all duration-500 ease-in-out',
        {
          'bg-[#7CCEF2] text-font': variant === 'blue',
          'bg-main-600 text-white': variant === 'red',
          'w-[700px]': isOpen,
          'w-[70px] ml-[630px]': !isOpen,
        },
      )}
      style={{
        minHeight: contentLoaded ? width + 2 * PADDING : undefined,
      }}
      ref={modelref}
    >
      <button
        className={cx('w-[70px] font-semibold text-default', {
          'bg-[#66BDE3]': variant === 'blue',
          'bg-main-700': variant === 'red',
        })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="block w-[70px] origin-top-left translate-x-1/2 translate-y-1/2 -rotate-90 whitespace-nowrap">
          <span
            className="block w-max -translate-x-1/2 -translate-y-1/2 overflow-visible"
            ref={ref}
          >
            {bookmarkTitle}
          </span>
        </span>
      </button>

      <div className="flex py-5">
        <div className="flex w-44 items-center justify-center">
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
                'bg-font': variant === 'blue',
                'bg-white': variant === 'red',
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

        <div className="flex w-[132px] items-start justify-end pr-5">
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
