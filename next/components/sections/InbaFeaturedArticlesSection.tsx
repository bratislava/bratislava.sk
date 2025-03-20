import React from 'react'

import InbaFeaturedArticles from '@/components/common/InbaFeaturedArticles/InbaFeaturedArticles'
import { InbaArticleEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

export type InbaFeaturedArticlesSectionProps = {
  articles: InbaArticleEntityFragment[]
}

const InbaFeaturedArticlesSection = ({ articles }: InbaFeaturedArticlesSectionProps) => {
  return (
    <div className="relative">
      <InbaFeaturedArticles articles={articles.filter(isDefined)} />
    </div>
  )
}

export default InbaFeaturedArticlesSection
