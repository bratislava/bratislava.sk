import { PagesFilters } from '@backend/meili/fetchers/pagesFetcher'
import { SearchCardNew } from '@components/molecules/SearchPageNew/SearchCardNew'
import { getSearchPagesData } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'

interface PagesResultsProps {
  title: string
  filters: PagesFilters
  handleShowMore: React.Dispatch<React.SetStateAction<Selection>>
}

const PagesResultsNew = ({ filters, title, handleShowMore }: PagesResultsProps) => {
  const data = getSearchPagesData(filters)
  const RESULTS_SHOWN = 5

  return (
    <div>
      <SearchResultsHeader title={title} handleShowMore={handleShowMore} />
      {data?.length > 0 ? (
        <div className="divide-y-2 rounded-lg border-2">
          {data.slice(0, RESULTS_SHOWN).map((item, index) => {
            return (
              <SearchCardNew
                title={`${item.title}`}
                tag="Stránka"
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

export default PagesResultsNew
