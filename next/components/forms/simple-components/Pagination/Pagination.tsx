import PaginationArrow from 'components/forms/simple-components/Pagination/PaginationArrow'
import PaginationButton from 'components/forms/simple-components/Pagination/PaginationButton'
import { useState } from 'react'

export type PaginationOption = {
  itemsPerPage: number
  listLength: number
}

interface PaginationProps {
  paginationOption: PaginationOption
  currentPage: number
  pageHandler: (pageNumber: number) => void
  variant?: 'category' | 'black'
}

const ThreeDots = () => {
  return (
    <div className="center w-12 h-12 flex justify-center items-center">
      <span className="text-20-semibold h-6 text-gray-700 flex items-start">&hellip;</span>
    </div>
  )
}

export const Pagination = ({
  currentPage = 1,
  pageHandler,
  variant = 'black',
  paginationOption,
}: PaginationProps) => {
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
  const numberOfPages = Math.ceil(paginationOption.listLength / paginationOption.itemsPerPage)

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

  return (
    <div className="relative flex justify-center h-12 w-full">
      <div className="flex items-center gap-2">
        {currentPage !== 1 ? (
          <PaginationArrow
            variant={variant}
            onPress={() => handlePreviousPageChange()}
            orientation="left"
          />
        ) : null}

        <PaginationButton
          variant={variant}
          pageNumber={1}
          onPress={() => handleSelectPage(1)}
          isActive={currentPage === 1}
        />
        {items[0].page - 1 >= 2 ? <ThreeDots /> : null}
        {items.map((item, index) =>
          item.page < numberOfPages && item.page > 1 ? (
            <PaginationButton
              key={index}
              pageNumber={item.page}
              variant={variant}
              onPress={() => handleSelectPage(item.page)}
              isActive={item.page === currentPage}
            />
          ) : null,
        )}
        {items[2].page + 1 < numberOfPages ? <ThreeDots /> : null}
        {numberOfPages > 1 ? (
          <PaginationButton
            pageNumber={numberOfPages}
            variant={variant}
            onPress={() => handleSelectPage(numberOfPages)}
            isActive={numberOfPages === currentPage}
          />
        ) : null}
        {currentPage !== numberOfPages ? (
          <PaginationArrow variant={variant} onPress={() => handleNextPageChange()} />
        ) : null}
      </div>
    </div>
  )
}

export default Pagination
