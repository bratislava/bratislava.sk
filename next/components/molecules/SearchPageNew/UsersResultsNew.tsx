import { SearchCardNew } from '@components/molecules/SearchPageNew/SearchCardNew'
import {
  getSearchUsersData,
  UsersFilters,
} from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'

interface UsersResultsProps {
  title: string
  filters: UsersFilters
  handleShowMore: React.Dispatch<React.SetStateAction<Selection>>
}

const UsersResultsNew = ({ filters, title, handleShowMore }: UsersResultsProps) => {
  const data = getSearchUsersData(filters)
  const RESULTS_SHOWN = 5

  return (
    <div>
      <SearchResultsHeader title={title} handleShowMore={handleShowMore} />
      {data?.length > 0 ? (
        <div className="divide-y-2 rounded-lg border-2">
          {data.slice(0, RESULTS_SHOWN).map((item) => {
            return (
              <SearchCardNew
                title={`${item.title}`}
                tag="Kontakt"
                slug={item.slug}
                metadata={item.metadata}
              />
            )
          })}
        </div>
      ) : (
        <p>No results</p>
      )}
    </div>
  )
}

export default UsersResultsNew
