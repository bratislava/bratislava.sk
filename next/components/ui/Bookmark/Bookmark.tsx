import cx from 'classnames'
import React from 'react'
import { ReactComponent as ChevronRight } from '../../../assets/images/chevron-right.svg'
import { ReactComponent as CloseOutline } from '../../../assets/images/close-outline.svg'

const PADDING = 20 // py-5

export interface BookmarkLink {
  title: string
  href: string
}

// TODO add imageSrc ???

export interface BookmarkProps {
  className?: string
  bookmarkTitle: string
  title: string
  content: string
  link: BookmarkLink
  variant: 'blue' | 'red'
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
  IconComponent,
  icon,
}: BookmarkProps) => {
  const [isOpen, setIsOpen] = React.useState(false)

  const ref = React.useRef<HTMLSpanElement>(null)
  const [width, setWidth] = React.useState<number>()
  const [height, setHeight] = React.useState<number>()

  React.useEffect(() => {
    if (!ref.current) return

    setWidth(ref.current.offsetWidth)
    setHeight(ref.current.offsetHeight)
  }, [ref.current])

  const contentLoaded = width !== undefined && height !== undefined

  return (
    <div
      className={cx(className, 'flex rounded-l-lg overflow-hidden transition-all duration-500 ease-in-out', {
        'bg-blue-sea text-font': variant === 'blue',
        'bg-red-brick text-white': variant === 'red',
        'w-175': isOpen,
        'w-17.5 ml-157.5': !isOpen,
      })}
      style={{
        minHeight: contentLoaded ? width + 2 * PADDING : undefined,
      }}
    >
      <button
        className={cx('w-17.5 font-semibold text-default', {
          'bg-blue-sea-dark': variant === 'blue',
          'bg-red-brick-dark': variant === 'red',
        })}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <span className="w-17.5 block origin-top-left transform translate-x-1/2 translate-y-1/2 -rotate-90 whitespace-nowrap">
          <span className="block overflow-visible transform -translate-x-1/2 -translate-y-1/2 w-max" ref={ref}>
            {bookmarkTitle}
          </span>
        </span>
      </button>

      <div className="flex py-5">
        <div className="flex justify-center items-center w-44.5">
          {icon ? (
            <div
              style={{
                backgroundImage: `url("${icon}")`,
              }}
              className="w-24 h-24 rounded-full"
            ></div>
          ) : (
            <div
              className={cx('w-24 h-24 rounded-full', {
                'bg-font': variant === 'blue',
                'bg-white': variant === 'red',
              })}
            ></div>
          )}
        </div>

        <div className="flex flex-col justify-center w-80">
          <h3 className="font-semibold text-md leading-[36px]">{title}</h3>
          <p className="my-3">{content}</p>
          <a href={link.href} className="flex items-center underline font-semibold">
            {link.title}
            <ChevronRight className="ml-6" />
          </a>
        </div>

        <div className="flex justify-end items-start w-33 pr-5">
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
