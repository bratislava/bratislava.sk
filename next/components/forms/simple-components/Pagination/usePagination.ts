import { PaginationOption } from 'components/forms/simple-components/Pagination/Pagination'
import { useState } from 'react'

type usePaginationBase = {
  paginationOption: PaginationOption
  currentPage: number
  pageHandler: (pageNumber: number) => void
}

const usePagination = ({ paginationOption, currentPage, pageHandler }: usePaginationBase) => {
  const maxPage: number = Math.ceil(paginationOption.listLength / paginationOption.itemsPerPage)

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

  const handleCurrentPageChange = (currentPageTmp: number) => {
    setItems([
      {
        page:
          currentPageTmp === 1
            ? currentPageTmp
            : currentPageTmp === maxPage
            ? currentPageTmp - 2
            : currentPageTmp - 1,
      },
      {
        page:
          currentPageTmp === 1
            ? currentPageTmp + 1
            : currentPageTmp === maxPage
            ? currentPageTmp - 1
            : currentPageTmp,
      },
      {
        page:
          currentPageTmp === 1
            ? currentPageTmp + 2
            : currentPageTmp === maxPage
            ? currentPageTmp
            : currentPageTmp + 1,
      },
    ])
  }

  const next = (): void => {
    pageHandler(Math.min(currentPage + 1, maxPage))
    handleCurrentPageChange(currentPage + 1)
  }

  const prev = (): void => {
    pageHandler(currentPage - 1)
    handleCurrentPageChange(currentPage - 1)
  }

  const jump = (page: number): void => {
    const pageNumber = Math.max(1, page)
    pageHandler(Math.min(pageNumber, maxPage))
    handleCurrentPageChange(page)
  }

  return {
    next,
    prev,
    jump,
    useCurrentPage: currentPage,
    items,
  }
}

export default usePagination
