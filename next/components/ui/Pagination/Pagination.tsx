import { useState } from 'react'
import cx from 'classnames'
import ArrowLeft from '@assets/images/arrow-left.svg'
import ArrowRight from '@assets/images/arrow-right.svg'
import ChevronLeft from '@assets/images/chevron-left.svg'
import ChevronRight from '@assets/images/chevron-right.svg'
import Button from '../Button/Button'

interface PaginationProps {
  totalPages?: number
  totalCount?: number
  currentPage: number
  itemsPerPage?: number
  pageHandler?: (pageNumber: number) => void
}

export const ThreeDots = () => {
  return (
    <div className="ml-2 sm:ml-3 w-7 sm:w-8">
      <span className="text-default font-semibold text-gray-universal-200">&hellip;</span>
    </div>
  )
}

export const 
Pagination = ({ totalPages, totalCount, currentPage = 1, pageHandler }: PaginationProps) => {
  const [items, setItems] = useState([
    {
      page: currentPage == 1 ? currentPage : currentPage - 1,
    },
    {
      page: currentPage == 1 ? currentPage + 1 : currentPage,
    },
    {
      page: currentPage == 1 ? currentPage + 2 : currentPage + 1,
    },
  ])
  const numberOfPages = totalPages

  const handleCurrentPageChange = (currentPage) => {
    setItems([
      {
        page: currentPage == 1 ? currentPage : currentPage == numberOfPages ? currentPage - 2 : currentPage - 1,
      },
      {
        page: currentPage == 1 ? currentPage + 1 : currentPage == numberOfPages ? currentPage - 1 : currentPage,
      },
      {
        page: currentPage == 1 ? currentPage + 2 : currentPage == numberOfPages ? currentPage : currentPage + 1,
      },
    ])
  }

  const handleNextPageChange = () => {
    if (currentPage != numberOfPages) {
      pageHandler(currentPage + 1)
      handleCurrentPageChange(currentPage + 1)
    }
  }

  const handlePreviousPageChange = () => {
    if (currentPage == 1) return
    pageHandler(currentPage - 1)
    handleCurrentPageChange(currentPage - 1)
  }

  const handleSelectPage = (e: number) => {
    if (e != currentPage) {
      pageHandler(e)
      handleCurrentPageChange(e)
    }
  }

  return (
    <div className="relative flex h-12 w-full">
      <div className="m-auto flex w-auto items-center justify-between">
        {currentPage != 1 ? (
          <div className="group mr-3 cursor-pointer text-primary">
            <span className="group-hover:hidden">
              <ChevronLeft />
            </span>
            <span className="hidden group-hover:block">
              <ArrowLeft onClick={handlePreviousPageChange} />
            </span>
          </div>
        ) : null}

        <Button
          value={1}
          variant={currentPage == 1 ? 'primary-border' : 'transparent-gray'}
          // className="mx-2 md:mx-3 h-8 w-8 sm:h-10 sm:w-10 md:h-12 md:w-12 rounded-full  hover:border-2 hover:border-primary"
          className={cx('mx-2 md:mx-3 h-10 w-10 md:h-12 md:w-12 rounded-full border-2 hover:border-primary shadow-none',
           { 'bg-primary text-white border-primary': currentPage == 1 })}
          onClick={() => handleSelectPage(1)}
        >
          <div className="m-auto block text-sm sm:text-default font-semibold leading-5">{1}</div>
        </Button>
        {items[0].page - 1 >= 2 ? <ThreeDots /> : null}
        {items.map((item, index) =>
          item.page < numberOfPages && item.page > 1 ? (
            <Button
              key={index}
              value={item.page.valueOf()}
              variant={item.page == currentPage ? 'primary-border' : 'transparent-gray'}
              className="mx-2 md:mx-3 h-10 w-10 md:h-12 md:w-12 rounded-full border-2 hover:border-primary shadow-none"
              onClick={() => handleSelectPage(item.page)}
            >
              <div className="m-auto block text-sm sm:text-default font-semibold leading-5 text--gray-universal-200">{item.page}</div>
            </Button>
          ) : null
        )}
        {items[2].page + 1 < numberOfPages ? <ThreeDots /> : null}
        {numberOfPages > 1 ? (
          <Button
            value={numberOfPages}
            variant={numberOfPages == currentPage ? 'primary-border' : 'transparent-gray'}
            className="mx-2 md:mx-3 h-10 w-10 md:h-12 md:w-12 rounded-full border-2 hover:border-primary shadow-none"
            onClick={() => handleSelectPage(numberOfPages)}
          >
            <div className="m-auto block text-sm sm:text-default font-semibold leading-5">{numberOfPages}</div>
          </Button>
        ) : null}
        {currentPage != numberOfPages ? (
          <div className="group ml-3 cursor-pointer text-primary">
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
