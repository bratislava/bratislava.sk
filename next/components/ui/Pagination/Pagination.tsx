// @ts-strict-ignore
import ArrowRight from '@assets/images/arrow-right.svg'
import ChevronLeft from '@assets/images/chevron-left.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import cx from 'classnames'
import { useState } from 'react'

import { Button } from '../Button/Button'

interface PaginationProps {
  totalPages?: number
  totalCount?: number
  currentPage: number
  itemsPerPage?: number
  pageHandler?: (pageNumber: number) => void
}

export const ThreeDots = () => {
  return (
    <div className="ml-2 w-7 sm:ml-3 sm:w-8">
      <span className="text-20-semibold text-gray-500">&hellip;</span>
    </div>
  )
}

export const Pagination = ({ totalPages, currentPage = 1, pageHandler }: PaginationProps) => {
  const [items, setItems] = useState([
    {
      page: currentPage === 1 ? currentPage : currentPage - 1,
    },
    {
      page: currentPage === 1 ? currentPage + 1 : currentPage,
    },
    {
      page: currentPage === 1 ? currentPage + 2 : currentPage + 1,
    },
  ])
  const numberOfPages = totalPages

  const handleCurrentPageChange = (currentPageTmp: number) => {
    setItems([
      {
        page:
          currentPageTmp === 1
            ? currentPageTmp
            : currentPageTmp === numberOfPages
            ? currentPageTmp - 2
            : currentPageTmp - 1,
      },
      {
        page:
          currentPageTmp === 1
            ? currentPageTmp + 1
            : currentPageTmp === numberOfPages
            ? currentPageTmp - 1
            : currentPageTmp,
      },
      {
        page:
          currentPageTmp === 1
            ? currentPageTmp + 2
            : currentPageTmp === numberOfPages
            ? currentPageTmp
            : currentPageTmp + 1,
      },
    ])
  }

  const handleNextPageChange = () => {
    if (currentPage !== numberOfPages) {
      pageHandler(currentPage + 1)
      handleCurrentPageChange(currentPage + 1)
    }
  }

  const handlePreviousPageChange = () => {
    if (currentPage === 1) return
    pageHandler(currentPage - 1)
    handleCurrentPageChange(currentPage - 1)
  }

  const handleSelectPage = (e: number) => {
    if (e !== currentPage) {
      pageHandler(e)
      handleCurrentPageChange(e)
    }
  }

  const getVariant = (pageNumber: number) => {
    return pageNumber === currentPage ? 'primary-border' : 'transparent-gray'
  }

  return (
    <div className="relative flex h-12 w-full">
      <div className="m-auto flex w-auto items-center justify-between">
        {currentPage !== 1 ? (
          <div className="group mr-3 cursor-pointer text-category-600">
            <span className="group-hover:hidden">
              <ChevronLeft />
            </span>
            <span className="hidden group-hover:block">
              <ArrowRight onClick={handlePreviousPageChange} className="rotate-180" />
            </span>
          </div>
        ) : null}

        <Button
          value={1}
          variant={getVariant(1)}
          // className="mx-2 md:mx-3 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full  hover:border-2 hover:border-category-600"
          className={cx(
            'mx-2 md:mx-3 h-10 w-10 md:h-12 md:w-12 rounded-full border-2 hover:border-category-600 shadow-none',
            { 'bg-category-600 text-white border-category-600': currentPage === 1 },
          )}
          onClick={() => handleSelectPage(1)}
        >
          <div className="text-p2-semibold sm:text-p1-semibold m-auto block leading-5">{1}</div>
        </Button>
        {items[0].page - 1 >= 2 ? <ThreeDots /> : null}
        {items.map((item, index) =>
          item.page < numberOfPages && item.page > 1 ? (
            <Button
              key={index}
              value={item.page.valueOf()}
              variant={getVariant(item.page)}
              className="mx-2 h-10 w-10 rounded-full border-2 shadow-none hover:border-category-600 md:mx-3 md:h-12 md:w-12"
              onClick={() => handleSelectPage(item.page)}
            >
              <div className="text-font/50 text-p1-semibold m-auto block leading-5">
                {item.page}
              </div>
            </Button>
          ) : null,
        )}
        {items[2].page + 1 < numberOfPages ? <ThreeDots /> : null}
        {numberOfPages > 1 ? (
          <Button
            value={numberOfPages}
            variant={getVariant(numberOfPages)}
            className="mx-2 h-10 w-10 rounded-full border-2 shadow-none hover:border-category-600 md:mx-3 md:h-12 md:w-12"
            onClick={() => handleSelectPage(numberOfPages)}
          >
            <div className="text-p2-semibold m-auto block leading-5">{numberOfPages}</div>
          </Button>
        ) : null}
        {currentPage !== numberOfPages ? (
          <div className="group ml-3 cursor-pointer text-category-600">
            <span className="group-hover:hidden">
              <ChevronRight />
            </span>
            <span className="hidden group-hover:block">
              <ArrowRight onClick={handleNextPageChange} />
            </span>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default Pagination
