import { Typography } from '@bratislava/component-library'
import React, { FocusEvent, useRef } from 'react'

import { CrossIcon } from '@/src/assets/ui-icons'
import Button from '@/src/components/common/Button/Button'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

const PADDING = 20 // py-5

export type BookmarkLink = {
  title: string | null | undefined
  href: string | null | undefined
}

export type BookmarkProps = {
  className?: string
  bookmarkTitle: string | null | undefined
  title: string | null | undefined
  content: string | null | undefined
  link: BookmarkLink
  variant?: 'blue' | 'red' | string | null
  icon?: string | null
}

// TODO: needs major refactoring
const Bookmark = ({
  className,
  bookmarkTitle,
  title,
  content,
  link,
  variant = 'red',
  icon,
}: BookmarkProps) => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = React.useState(false)

  const ref = React.useRef<HTMLSpanElement>(null)
  const [width, setWidth] = React.useState<number>()
  const [height, setHeight] = React.useState<number>()

  const modelRef = useRef<HTMLDivElement>(null)

  const handleBlur = (event: FocusEvent<HTMLDivElement>) => {
    if (!modelRef.current) {
      return
    }

    // https://stackoverflow.com/a/33325953
    if (!event.relatedTarget || !modelRef.current.contains(event.relatedTarget)) {
      setIsOpen(false)
    }
  }

  React.useEffect(() => {
    if (!ref.current) return

    setWidth(ref.current.offsetWidth)
    setHeight(ref.current.offsetHeight)
  }, [ref.current])

  const contentLoaded = width !== undefined && height !== undefined

  return (
    <div
      className={cn(
        className,
        'flex overflow-hidden rounded-l-lg transition-all duration-500 ease-in-out',
        {
          'bg-[#7CCEF2] text-font': variant === 'blue',
          'bg-main-600 text-white': variant === 'red',
          'w-[700px]': isOpen,
          'ml-[630px] w-[70px]': !isOpen,
        },
      )}
      style={{
        minHeight: contentLoaded ? width + 2 * PADDING : undefined,
      }}
      ref={modelRef}
      onBlur={handleBlur}
    >
      <Button
        className={cn('text-large w-[70px] font-semibold', {
          'bg-[#66BDE3]': variant === 'blue',
          'bg-main-700': variant === 'red',
        })}
        onPress={() => setIsOpen((prev) => !prev)}
      >
        <span className="block w-[70px] origin-top-left translate-x-1/2 translate-y-1/2 -rotate-90 whitespace-nowrap">
          <span
            className="block w-max -translate-x-1/2 -translate-y-1/2 overflow-visible"
            ref={ref}
          >
            {bookmarkTitle}
          </span>
        </span>
      </Button>

      {/* @ts-ignore */}
      <div className="flex py-5" aria-hidden={!isOpen} inert={(!isOpen).toString()}>
        <div className="flex w-44 items-center justify-center">
          {icon ? (
            <div
              style={{
                backgroundImage: `url("${icon}")`,
              }}
              className="size-24 rounded-full"
            />
          ) : (
            <div
              className={cn('h-24 w-24 rounded-full', {
                'bg-font': variant === 'blue',
                'bg-white': variant === 'red',
              })}
            />
          )}
        </div>

        <div className="flex w-80 flex-col justify-center">
          <Typography type="h3" size="h4" className="leading-[36px]">
            {title}
          </Typography>
          <Typography type="p" className="my-3">
            {content}
          </Typography>
          {link.href && link.title ? (
            <Button
              href={link.href}
              variant="link"
              className={
                variant === 'red' ? 'text-white hover:text-white hover:opacity-70' : undefined
              }
            >
              {link.title}
            </Button>
          ) : null}
        </div>

        <div className="flex w-[132px] items-start justify-end pr-5">
          <Button
            onPress={() => setIsOpen(false)}
            icon={<CrossIcon />}
            aria-label={t('Bookmark.aria.close')}
          />
        </div>
      </div>
    </div>
  )
}

export default Bookmark
