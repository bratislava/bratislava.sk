import { useState } from 'react'
import Button from '../Button/Button'

import ArrowLeft from '../../../assets/images/arrow-left.svg'
import ArrowRight from '../../../assets/images/arrow-right.svg'
import ChevronRight from '../../../assets/images/chevron-right.svg'
import ChevronLeft from '../../../assets/images/chevron-left.svg'

interface PaginationProps {
  totalPages: number
  totalCount: number
  currentPage: number
  pageHandler?: (pageNumber: number) => void
}

export const ThreeDots = () => {
  return (
    <div className="ml-6 w-12">
      <span className="text-default font-semibold">&hellip;</span>
    </div>
  )
}

export const Pagination = ({ totalPages, totalCount, currentPage = 1, pageHandler }: PaginationProps) => {
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
    <div className="flex relative w-full h-12">
      <div className="m-auto flex items-center w-auto justify-between">
        {currentPage != 1 ? (
          <div className="group mr-6 text-primary">
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
          variant={1 == currentPage ? 'primary' : 'secondaryDarkText'}
          className="h-12 w-12 rounded-full mx-6  hover:border-2 hover:border-primary"
          onClick={() => handleSelectPage(1)}
        >
          <div className="text-default font-semibold block m-auto leading-5">{1}</div>
        </Button>
        {items[0].page - 1 >= 2 ? <ThreeDots /> : null}
        {items.map((item, index) =>
          item.page < numberOfPages && item.page > 1 ? (
            <Button
              key={index}
              value={item.page.valueOf()}
              variant={item.page == currentPage ? 'primary' : 'secondaryDarkText'}
              className="h-12 w-12 rounded-full mx-6 hover:border-2 hover:border-primary"
              onClick={() => handleSelectPage(item.page)}
            >
              <div className="text-default font-semibold block m-auto leading-5">{item.page}</div>
            </Button>
          ) : null
        )}
        {items[2].page + 1 < numberOfPages ? <ThreeDots /> : null}
        {numberOfPages > 1 ? (
          <Button
            value={numberOfPages}
            variant={numberOfPages == currentPage ? 'primary' : 'secondaryDarkText'}
            className="h-12 w-12 rounded-full mx-6 hover:border-2 hover:border-primary"
            onClick={() => handleSelectPage(numberOfPages)}
          >
            <div className="text-default font-semibold block m-auto leading-5">{numberOfPages}</div>
          </Button>
        ) : null}
        {currentPage != numberOfPages ? (
          <div className="group ml-6 text-primary">
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
