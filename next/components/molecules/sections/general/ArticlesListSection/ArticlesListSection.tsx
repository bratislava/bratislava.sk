import { ArticlesListSectionFragment } from '@backend/graphql'
import { isPresent } from '@utils/utils'
import React from 'react'

import ArticlesList from './ArticlesList'

type ArticlesListSectionProps = { section: ArticlesListSectionFragment }

const ArticlesListSection = ({ section }: ArticlesListSectionProps) => {
  if (!isPresent(section.title) || !isPresent(section.filtering)) {
    return null
  }

  return (
    <ArticlesList
      title={section.title}
      includesFiltering={section.filtering}
      category={section.category?.data?.attributes?.title ?? undefined}
    />
  )
}

export default ArticlesListSection
