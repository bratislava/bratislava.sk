import { PageEntityFragment } from '@backend/graphql'
import {
  getRelatedBlogPostsQueryKey,
  relatedBlogPostsFetcher,
} from '@backend/graphql/fetchers/relatedBlogPosts.fetcher'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import { useQuery } from '@tanstack/react-query'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { generateImageSizes } from '@utils/generateImageSizes'
import { isDefined } from '@utils/isDefined'
import { getNumericLocalDate } from '@utils/local-date'
import { useLocale, useTranslations } from 'next-intl'
import React from 'react'

type Props = {
  page: PageEntityFragment
  className?: string
}

const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

const RelatedBlogPostsSection = ({ page, className }: Props) => {
  const t = useTranslations('RelatedBlogPostsSection')
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
            <h2 className="text-h2">{t('relatedBlogPosts')}</h2>
          </div>
        </div>

        <ResponsiveCarousel
          items={data.blogPosts.data.filter(isDefined).map((card) => {
            if (!card.attributes) return null

            // TODO refactor sections that use BlogPostCard - it needs too much duplicate code while passing props
            const { title, slug, coverImage, tag, date_added, publishedAt } = card.attributes
            const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
            const tagTitle = tag?.data?.attributes?.title

            return (
              <BlogPostCard
                key={card.id}
                style={getCategoryColorLocalStyle({ color: tagColor })}
                variant="shadow"
                imgSrc={coverImage?.data?.attributes?.url}
                imgSizes={imageSizes}
                date={getNumericLocalDate(date_added ?? publishedAt)}
                title={title ?? ''}
                tag={tagTitle ?? undefined}
                linkProps={{ children: t('readMore'), href: `/blog/${slug}` }}
              />
            )
          })}
        />
      </div>
    </SectionContainer>
  )
}

export default RelatedBlogPostsSection
