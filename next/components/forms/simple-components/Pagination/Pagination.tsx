import PaginationArrow from 'components/forms/simple-components/Pagination/PaginationArrow'
import PaginationButton from 'components/forms/simple-components/Pagination/PaginationButton'
import usePagination from 'components/forms/simple-components/Pagination/usePagination'
import { ReactNode } from 'react'

interface PaginationProps {
  onChange?: (value: number) => void
  selectedPage: number
  count: number
  className?: string
}

export const Pagination = ({ onChange, selectedPage, className, count }: PaginationProps) => {
  const { items } = usePagination({
    count,
    page: selectedPage,
    onChange(_, value) {
      if (onChange) onChange(value)
    },
  })

  return (
    <div className={className}>
      <ul className="flex flex-wrap items-center justify-center gap-1 md:gap-2">
        {items.map(({ page, type, selected, disabled, onPress }, index) => {
          let children: ReactNode = null

          // eslint-disable-next-line unicorn/prefer-switch
          if (type === 'start-ellipsis' || type === 'end-ellipsis') {
            children = '…'
          } else if (type === 'page') {
            children = (
              <PaginationButton
                variant={selected ? 'pagination-selected' : 'pagination'}
                disabled={disabled}
                onPress={onPress}
              >
                {page}
              </PaginationButton>
            )
          } else if (type === 'previous' || type === 'next') {
            let icon: ReactNode
            if (type === 'previous' && selectedPage !== 1) {
              icon = <PaginationArrow orientation="left" />
            }
            if (type === 'next' && selectedPage !== count) {
              icon = <PaginationArrow />
            }

            children = (
              <PaginationButton type="arrow" disabled={disabled} onPress={onPress}>
                {icon}
              </PaginationButton>
            )
          }

          return (
            <li className="text-p2-semibold w-10 md:w-12 flex justify-center" key={index}>
              {children}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Pagination
