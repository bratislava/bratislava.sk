import { PagesFilters } from '@backend/meili/fetchers/pagesFetcher'
import {
  SearchCardNew,
  SearchCardWithPictureNew,
} from '@components/molecules/SearchPageNew/SearchCardNew'
import {
  getSearchPagesData,
  getSearchPagesDataWithPicture,
} from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'

interface OnlyPagesResultsProps {
  filters: PagesFilters
}

const OnlyPagesResultsNew = ({ filters }: OnlyPagesResultsProps) => {
  const data = getSearchPagesDataWithPicture(filters)
  const RESULTS_SHOWN = 15

  return (
    <div>
      {data?.length > 0 ? (
        <div className="divide-y-2 rounded-lg border-2">
          {data.slice(0, RESULTS_SHOWN).map((item, index) => {
            return (
              <SearchCardWithPictureNew
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

export default OnlyPagesResultsNew
