import { BlogPostsFilters } from '@backend/meili/fetchers/blogPostsFetcher'
import { SearchCardNew } from '@components/molecules/SearchPageNew/SearchCardNew'
import { getSearchBlogPostsData } from '@components/molecules/SearchPageNew/searchDataFetchers'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'

interface BlogPostsResultsProps {
  title: string
  filters: BlogPostsFilters
  handleShowMore: React.Dispatch<React.SetStateAction<Selection>>
}

const BlogPostsResultsNew = ({ filters, title, handleShowMore }: BlogPostsResultsProps) => {
  const data = getSearchBlogPostsData(filters)
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
                tag="Článok"
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

export default BlogPostsResultsNew
