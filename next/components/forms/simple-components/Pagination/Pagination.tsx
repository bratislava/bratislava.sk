import PaginationArrow from 'components/forms/simple-components/Pagination/PaginationArrow'
import PaginationButton from 'components/forms/simple-components/Pagination/PaginationButton'
import usePagination from 'components/forms/simple-components/Pagination/usePagination'

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
  const { next, prev, jump, useCurrentPage, items } = usePagination({
    paginationOption,
    currentPage,
    pageHandler,
  })

  const numberOfPages = Math.ceil(paginationOption.listLength / paginationOption.itemsPerPage)
  return (
    <div className="relative flex justify-center h-12 w-full">
      <div className="flex items-center gap-2">
        {useCurrentPage !== 1 ? (
          <PaginationArrow variant={variant} onPress={() => prev()} orientation="left" />
        ) : null}

        <PaginationButton
          variant={variant}
          pageNumber={1}
          onPress={() => jump(1)}
          isActive={useCurrentPage === 1}
        />
        {items[0].page - 1 >= 2 ? <ThreeDots /> : null}
        {items.map((item, index) =>
          item.page < numberOfPages && item.page > 1 ? (
            <PaginationButton
              key={index}
              pageNumber={item.page}
              variant={variant}
              onPress={() => jump(item.page)}
              isActive={item.page === useCurrentPage}
            />
          ) : null,
        )}
        {items[2].page + 1 < numberOfPages ? <ThreeDots /> : null}
        {numberOfPages > 1 ? (
          <PaginationButton
            pageNumber={numberOfPages}
            variant={variant}
            onPress={() => jump(numberOfPages)}
            isActive={numberOfPages === useCurrentPage}
          />
        ) : null}
        {useCurrentPage !== numberOfPages ? (
          <PaginationArrow variant={variant} onPress={() => next()} />
        ) : null}
      </div>
    </div>
  )
}

export default Pagination
