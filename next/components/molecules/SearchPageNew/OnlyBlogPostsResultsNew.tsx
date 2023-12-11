import { BlogPostsFilters } from '@backend/meili/fetchers/blogPostsFetcher'
import {
  SearchCardNew,
  SearchCardWithPictureNew,
} from '@components/molecules/SearchPageNew/SearchCardNew'
import { getSearchBlogPostsDataWithPicture } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import { filter } from 'lodash'

interface BlogPostsResultsProps {
  filters: BlogPostsFilters
}

const OnlyBlogPostsResultsNew = ({ filters }: BlogPostsResultsProps) => {
  const data = getSearchBlogPostsDataWithPicture(filters)
  // const RESULTS_SHOWN = 5

  return (
    <div>
      <div className="mb-4 h-[80px] w-full bg-gray-200">
        <h2>Doplnkový filter</h2>
      </div>
      {/* <SearchResultsHeader title={title} handleShowMore={handleShowMore} /> */}
      {data?.length > 0 ? (
        <div className="flex flex-col gap-y-2">
          {data.slice(0, filters.pageSize).map((item) => {
            return (
              <SearchCardWithPictureNew
                title={`${item.title}`}
                tag="Článok"
                slug={item.slug}
                metadata={item.metadata}
                picture={item.picture}
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

export default OnlyBlogPostsResultsNew
