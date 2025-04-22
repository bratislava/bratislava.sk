import { Typography } from '@bratislava/component-library'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import BlogPostCard from '@/src/components/cards/BlogPostCard'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import { PageEntityFragment } from '@/src/services/graphql'
import {
  getRelatedBlogPostsQueryKey,
  relatedBlogPostsFetcher,
} from '@/src/services/graphql/fetchers/relatedBlogPosts.fetcher'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { getNumericLocalDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  page: PageEntityFragment
  className?: string
}

const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

const RelatedBlogPostsSection = ({ page, className }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getRelatedBlogPostsQueryKey(page, locale),
    queryFn: () => relatedBlogPostsFetcher(page, locale),
    staleTime: Infinity,
  })

  if (!data?.blogPosts?.data?.length) {
    return null
  }

  return (
    <SectionContainer className={className}>
      <div className="flex flex-col">
        <div className="flex">
          <div className="grow">
            <Typography type="h2">{t('RelatedBlogPostsSection.relatedBlogPosts')}</Typography>
          </div>
        </div>

        <ResponsiveCarousel
          items={data.blogPosts.data.filter(isDefined).map((card) => {
            if (!card.attributes) return null

            // TODO refactor sections that use BlogPostCard - it needs too much duplicate code while passing props
            const { title, slug, coverImage, tag, addedAt } = card.attributes
            const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
            const tagTitle = tag?.data?.attributes?.title

            return (
              <BlogPostCard
                key={card.id}
                style={getCategoryColorLocalStyle({ color: tagColor })}
                imgSrc={coverImage?.data?.attributes?.url}
                imgSizes={imageSizes}
                date={getNumericLocalDate(addedAt)}
                title={title ?? ''}
                tag={tagTitle ?? undefined}
                linkProps={{
                  children: t('RelatedBlogPostsSection.readMore'),
                  href: `/blog/${slug}`,
                }}
              />
            )
          })}
        />
      </div>
    </SectionContainer>
  )
}

export default RelatedBlogPostsSection
