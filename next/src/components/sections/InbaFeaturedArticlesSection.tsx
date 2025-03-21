import React from 'react'

import InbaFeaturedArticles from '@/src/components/common/InbaFeaturedArticles/InbaFeaturedArticles'
import { InbaArticleEntityFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

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
