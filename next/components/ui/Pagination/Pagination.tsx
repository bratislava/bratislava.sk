import { ArrowLeftIcon, ArrowRightIcon } from '@assets/images'
import Button from '@components/forms/simple-components/Button'
import usePagination from '@components/ui/Pagination/usePagination'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React, { ReactNode } from 'react'

type PaginationProps = {
  currentPage: number
  totalCount: number
  onPageChange?: (value: number) => void
}

/**
 * Inspired by Marianum: https://github.com/bratislava/marianum.sk/tree/master/next/components/atoms/Pagination
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%3A-Component-library?node-id=10-223&t=XE0jQhTbQ7OSncdz-0
 *
 * @param selectedPage
 * @param totalCount
 * @param onPageChange
 * @constructor
 */
export const Pagination = ({
  currentPage,
  totalCount,
  onPageChange = () => {},
}: PaginationProps) => {
  const t = useTranslations('Pagination')

  const { items } = usePagination({
    count: totalCount,
    page: currentPage,
    onChange: (event, value) => {
      // When not blurred the button stays focused and is confusing.
      ;(event.target as HTMLButtonElement).blur()
      onPageChange(value)
    },
  })

  return (
    <nav>
      <ul className="flex flex-wrap items-center justify-center gap-1 lg:gap-2">
        {items.map(
          ({ page, type, selected, disabled, onPress, 'aria-current': ariaCurrent }, index) => {
            let children: ReactNode = null

            // eslint-disable-next-line unicorn/prefer-switch
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…'
            } else if (type === 'page') {
              children = (
                <Button
                  variant={selected ? 'category' : 'category-outline'}
                  disabled={disabled}
                  onPress={onPress}
                  aria-current={ariaCurrent}
                  aria-label={t('aria.goToPage', { page })}
                  className="flex h-10 w-10 shrink-0 grow-0 items-center justify-center rounded-full lg:h-12 lg:w-12"
                >
                  {page}
                </Button>
              )
            } else if (type === 'previous' || type === 'next') {
              let icon: ReactNode
              let ariaLabel = ''
              if (type === 'previous') {
                icon = <ArrowLeftIcon />
                ariaLabel = t('aria.goToPreviousPage', { page })
              }
              if (type === 'next') {
                icon = <ArrowRightIcon />
                ariaLabel = t('aria.goToNextPage', { page })
              }

              children = (
                <Button
                  variant="category-plain"
                  disabled={disabled}
                  onPress={onPress}
                  aria-label={ariaLabel}
                  icon={icon}
                  className="rounded-full"
                />
              )
            }

            return (
              <li
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                className={cx({
                  'text-sm flex w-10 items-center justify-center font-semibold lg:w-12':
                    type === 'start-ellipsis' || type === 'end-ellipsis',
                  'lg:mr-2': type === 'previous',
                  'lg:ml-2': type === 'next',
                })}
              >
                {children}
              </li>
            )
          },
        )}
      </ul>
    </nav>
  )
}

export default Pagination
