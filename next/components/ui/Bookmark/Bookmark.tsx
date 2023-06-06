import { CrossIcon } from '@assets/ui-icons'
import Button from '@components/forms/simple-components/Button'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useRef, FocusEvent } from 'react'
import { Button as AriaButton } from 'react-aria-components'

const PADDING = 20 // py-5

export interface BookmarkLink {
  title: string | null | undefined
  href: string | null | undefined
}

export interface BookmarkProps {
  className?: string
  bookmarkTitle: string | null | undefined
  title: string | null | undefined
  content: string | null | undefined
  link: BookmarkLink
  variant?: 'blue' | 'red' | string | null
  icon?: string | null
}

// TODO: needs major refactoring
export const Bookmark = ({
  className,
  bookmarkTitle,
  title,
  content,
  link,
  variant = 'red',
  icon,
}: BookmarkProps) => {
  const t = useTranslations('Bookmark')
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
      className={cx(
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
      <AriaButton
        className={cx('text-large w-[70px] font-semibold', {
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
      </AriaButton>

      {/* https://github.com/facebook/react/issues/17157#issuecomment-1572230721 */}
      <div className="flex py-5" aria-hidden={!isOpen} {...(isOpen ? {} : { inert: '' })}>
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
              className={cx('h-24 w-24 rounded-full', {
                'bg-font': variant === 'blue',
                'bg-white': variant === 'red',
              })}
            />
          )}
        </div>

        <div className="flex w-80 flex-col justify-center">
          <h3 className="text-h4 leading-[36px]">{title}</h3>
          <p className="my-3">{content}</p>
          {link.href && link.title ? (
            <Button
              href={link.href}
              variant="black-link"
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
            aria-label={t('aria.close')}
          />
        </div>
      </div>
    </div>
  )
}

export default Bookmark
