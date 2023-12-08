import { title } from 'node:process'

import {
  blogPostsFetcher,
  BlogPostsFilters,
  getBlogPostsSwrKey,
} from '@backend/meili/fetchers/blogPostsFetcher'
import { BlogSearchCards } from '@bratislava/ui-bratislava/BlogSearchCards/BlogSearchCards'
import { LoadingSpinner } from '@bratislava/ui-bratislava/LoadingSpinner/LoadingSpinner'
import LoadingOverlay from '@components/molecules/SearchPage/LoadingOverlay'
import { SearchCardNew } from '@components/molecules/SearchPageNew/SearchCardNew'
import { SearchResultsHeader } from '@components/molecules/SearchPageNew/SearchResultsHeader'
import { BlogItem } from '@components/ui/BlogSearchCard/BlogSearchCard'
import { formatDate } from '@utils/local-date'
import useGetSwrExtras from '@utils/useGetSwrExtras'
import { SearchResponse } from 'meilisearch'
import { useLocale, useTranslations } from 'next-intl'
import useSwr from 'swr'

interface BlogPostsResultsProps {
  title: string
  filters: BlogPostsFilters
  handleShowMore: React.Dispatch<React.SetStateAction<Selection>>
}

const sampleData = [
  { title: 'blogPostTitle1', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'blogPostTitle2', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'blogPostTitle3', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'blogPostTitle4', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
  { title: 'blogPostTitle5', url: 'www.bratislava.sk/someURL', metadata: ['meta1', 'meta2'] },
]

const BlogPostsResultsNew = ({ filters, title, handleShowMore }: BlogPostsResultsProps) => {
  const data = getData(filters)
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

const getData = (filters: BlogPostsFilters) => {
  const t = useTranslations()
  const locale = useLocale()

  const { data, error } = useSwr(
    getBlogPostsSwrKey(filters, locale),
    blogPostsFetcher(filters, locale),
  )
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
    data,
    error,
  })

  const formattedData =
    data?.hits?.map((blogPostData: BlogItem) => {
      return {
        title: `${blogPostData.attributes.title.slice(0, 50)}...` ?? '',
        slug: `blog/${blogPostData.attributes.slug}` ?? '',
        metadata:
          [
            blogPostData.attributes.tag.data.attributes.pageCategory.data.attributes.shortTitle,
            formatDate(blogPostData.attributes?.publishedAt),
          ] ?? [],
      }
    }) ?? []

  return formattedData ?? []

  // TODO: pridat tuto funkcionalitu + paginaciu ktora bola tiez v povodnom kode
  // if (loadingAndNoDataToDisplay) {
  //   return <LoadingSpinner />
  // }
  // // TODO replace by proper error
  // if (error) {
  //   return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  // }
  // return (
  //   <LoadingOverlay loading={delayedLoading}>
  //     <h2 className="text-h5 pb-6">{t('articles')}</h2>
  //     {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
  //     <BlogPosts data={dataToDisplay!} filters={filters} />
  //   </LoadingOverlay>
  // )
}

export default BlogPostsResultsNew

// const BlogPosts = ({ data }: { data: SearchResponse<BlogItem>; filters: BlogPostsFilters }) => {
//   const t = useTranslations()

//   if (data.hits.length > 0) {
//     return <BlogSearchCards blogs={data.hits} />
//   }
//   return <div>{t('noBlogPostsToShow')}</div>
// }

// // TODO add proper pagination - design for mobile needs to be updated
// const DataWrapper = ({
//   filters,
//   onPageChange,
// }: {
//   filters: BlogPostsFilters
//   onPageChange?: (page: number) => void
// }) => {
//   const t = useTranslations()
//   const locale = useLocale()

//   const { data, error } = useSwr(
//     getBlogPostsSwrKey(filters, locale),
//     blogPostsFetcher(filters, locale),
//   )
//   // eslint-disable-next-line @typescript-eslint/no-unsafe-call
//   const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
//     data,
//     error,
//   })

//   if (loadingAndNoDataToDisplay) {
//     return <LoadingSpinner />
//   }

//   // TODO replace by proper error
//   if (error) {
//     return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
//   }

//   return (
//     <LoadingOverlay loading={delayedLoading}>
//       <h2 className="text-h5 pb-6">{t('articles')}</h2>
//       {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
//       <BlogPosts data={dataToDisplay!} filters={filters} />
//     </LoadingOverlay>
//   )
// }

// const BlogPostsResultsNew = ({ filters }: BlogPostsResultsProps) => {
//   return <DataWrapper filters={filters} />
// }

// export default BlogPostsResultsNew
