import { useQuery } from '@tanstack/react-query'
import React from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { PageEntityFragment } from '@/src/services/graphql'
import {
  getRelatedArticlesQueryKey,
  relatedArticlesFetcher,
} from '@/src/services/meili/fetchers/relatedArticlesFetcher'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  page: PageEntityFragment
  className?: string
}

/**
 * TODO Figma link
 */

const RelatedArticlesSection = ({ page, className }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { data } = useQuery({
    queryKey: getRelatedArticlesQueryKey(page, locale),
    queryFn: () => relatedArticlesFetcher(page, locale),
    staleTime: Infinity,
  })

  if (!data?.hits.length) {
    return null
  }

  return (
    <SectionContainer className={className}>
      <div className="flex flex-col">
        <SectionHeader title={t('RelatedArticlesSection.relatedArticles')} />

        <ResponsiveCarousel
          items={data.hits.map((card) => {
            return card ? <ArticleCard key={card.slug} {...transformArticleProps(card)} /> : null
          })}
        />
      </div>
    </SectionContainer>
  )
}

export default RelatedArticlesSection
