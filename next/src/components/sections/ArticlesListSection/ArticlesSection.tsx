import React from 'react'

import ArticlesAllSection from '@/src/components/sections/ArticlesListSection/ArticlesAllSection'
import ArticlesByCategory from '@/src/components/sections/ArticlesListSection/ArticlesByCategory'
import { ArticlesSectionFragment } from '@/src/services/graphql'

type Props = {
  section: ArticlesSectionFragment
}

const ArticlesSection = ({ section }: Props) => {
  return section.showAll ? (
    <ArticlesAllSection section={section} />
  ) : (
    <ArticlesByCategory section={section} />
  )
}

export default ArticlesSection
