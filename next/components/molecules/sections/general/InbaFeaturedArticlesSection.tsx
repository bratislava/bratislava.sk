import { InbaArticleEntityFragment } from '@backend/graphql'
import { InbaFeaturedArticles } from '@components/ui/InbaFeaturedArticles/InbaFeaturedArticles'
import { isDefined } from '@utils/isDefined'
import React from 'react'

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
