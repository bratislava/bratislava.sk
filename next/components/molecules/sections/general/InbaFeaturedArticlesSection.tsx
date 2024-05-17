import { InbaArticleEntityFragment } from '@backend/graphql'
import InbaFeaturedArticles from '@components/ui/InbaFeaturedArticles/InbaFeaturedArticles'
import React from 'react'

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
