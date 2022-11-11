// @ts-strict-ignore
import { blogPostsFetcher, BlogPostsFilters, getBlogPostsSwrKey } from '@backend/meili/fetchers/blogPostsFetcher'
import { BlogItem, BlogSearchCards, LoadingSpinner } from '@bratislava/ui-bratislava'
import useGetSwrExtras from '@utils/useGetSwrExtras'
import { SearchResponse } from 'meilisearch'
import { useTranslation } from 'next-i18next'
import useSwr from 'swr'

import LoadingOverlay from './LoadingOverlay'

interface BlogPostsResultsProps {
  filters: BlogPostsFilters
}

const BlogPosts = ({ data }: { data: SearchResponse<BlogItem>; filters: BlogPostsFilters }) => {
  const { t } = useTranslation('common')

  if (data.hits.length > 0) {
    return <BlogSearchCards blogs={data.hits} />
  }
  return <div>{t('noBlogPostsToShow')}</div>
}

// TODO add proper pagination - design for mobile needs to be updated
const DataWrapper = ({
  filters,
  onPageChange,
}: {
  filters: BlogPostsFilters
  onPageChange?: (page: number) => void
}) => {
  const { t, i18n } = useTranslation('common')

  const { data, error } = useSwr(getBlogPostsSwrKey(filters, i18n.language), blogPostsFetcher(filters, i18n.language))
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const { dataToDisplay, loadingAndNoDataToDisplay, delayedLoading } = useGetSwrExtras({
    data,
    error,
  })

  if (loadingAndNoDataToDisplay) {
    return <LoadingSpinner />
  }

  // TODO replace by proper error
  if (error) {
    return <div className="whitespace-pre">Error: {JSON.stringify(error, null, 2)}</div>
  }

  return (
    <LoadingOverlay loading={delayedLoading}>
      <h2 className="text-h5 pb-6 font-semibold">{t('articles')}</h2>
      {/* eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */}
      <BlogPosts data={dataToDisplay!} filters={filters} />
    </LoadingOverlay>
  )
}

const BlogPostsResults = ({ filters }: BlogPostsResultsProps) => {
  return <DataWrapper filters={filters} />
}

export default BlogPostsResults
