import { ReactNode } from 'react'
import { ArrowLeftIcon, ArrowRightIcon } from 'src/assets/icons'

import Button from '@/src/components/common/Button/Button'
import usePagination from '@/src/components/common/Pagination/usePagination'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

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
const Pagination = ({ currentPage, totalCount, onPageChange = () => {} }: PaginationProps) => {
  const { t } = useTranslation()

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
      <ul
        className="flex flex-wrap items-center justify-center gap-1 lg:gap-2"
        data-cy="pagination"
      >
        {items.map(
          ({ page, type, selected, disabled, onPress, 'aria-current': ariaCurrent }, index) => {
            let children: ReactNode = null

            // eslint-disable-next-line unicorn/prefer-switch
            if (type === 'start-ellipsis' || type === 'end-ellipsis') {
              children = '…'
            } else if (type === 'page') {
              children = (
                <Button
                  variant={selected ? 'solid' : 'outline'}
                  isDisabled={disabled}
                  onPress={onPress}
                  aria-current={ariaCurrent}
                  aria-label={t('Pagination.aria.goToPage', { page })}
                  className="flex size-10 shrink-0 grow-0 items-center justify-center rounded-full lg:size-12"
                >
                  {page}
                </Button>
              )
            } else if (type === 'previous' || type === 'next') {
              let icon: ReactNode
              let ariaLabel = ''
              if (type === 'previous') {
                icon = <ArrowLeftIcon />
                ariaLabel = t('Pagination.aria.goToPreviousPage')
              }
              if (type === 'next') {
                icon = <ArrowRightIcon />
                ariaLabel = t('Pagination.aria.goToNextPage')
              }

              children = (
                <Button
                  variant="plain"
                  isDisabled={disabled}
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
                className={cn({
                  'flex w-10 items-center justify-center text-size-p-small font-semibold lg:w-12':
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
