import { TagEntity } from '@backend/graphql'
import {
  getRelatedBlogPostsQueryKey,
  relatedBlogPostsFetcher,
} from '@backend/graphql/fetchers/relatedBlogPosts.fetcher'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import { useQuery } from '@tanstack/react-query'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { isDefined } from '@utils/isDefined'
import { getNumericLocalDate } from '@utils/local-date'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

type Props = {
  tags: TagEntity[] | null | undefined
  className?: string
}

const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

const RelatedBlogPostsSection = ({ tags, className }: Props) => {
  const t = useTranslations('RelatedBlogPostsSection')
  const locale = useLocale()

  const tagStrings = tags?.map((tag) => tag.attributes?.title).filter(isDefined) ?? []

  const { data } = useQuery({
    queryKey: getRelatedBlogPostsQueryKey(tagStrings, locale),
    queryFn: () => relatedBlogPostsFetcher(tagStrings, locale),
    staleTime: Infinity,
  })

  if (!tags?.length) {
    return null
  }

  return (
    <SectionContainer className={className}>
      <div className="flex flex-col gap-6 lg:gap-12">
        <div className="flex">
          <div className="grow">
            <h2 className="text-h2">{t('relatedBlogPosts')}</h2>
          </div>
        </div>
        {/* TODO fetch more posts and use Carousel, at least for mobile */}
        <ul className="grid grid-cols-1 gap-3 lg:grid-cols-3 lg:gap-8">
          {data?.blogPosts?.data.filter(isDefined).map((card) => {
            if (!card.attributes) return null

            // TODO refactor sections that use BlogPostCard - it needs too much duplicate code while passing props
            const { title, slug, coverImage, tag, date_added, publishedAt } = card.attributes
            const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
            const tagTitle = tag?.data?.attributes?.title

            return (
              <BlogPostCard
                style={getCategoryColorLocalStyle({ color: tagColor })}
                variant="shadow"
                date={getNumericLocalDate(date_added ?? publishedAt)}
                tag={tagTitle ?? undefined}
                title={title ?? ''}
                linkProps={{ children: t('readMore'), href: `/blog/${slug}` }}
                imgSrc={coverImage?.data?.attributes?.url}
                imgSizes={imageSizes}
              />
            )
          })}
        </ul>
      </div>
    </SectionContainer>
  )
}

export default RelatedBlogPostsSection
