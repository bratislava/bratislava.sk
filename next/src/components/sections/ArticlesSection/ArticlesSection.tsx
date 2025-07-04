import React from 'react'

import SectionContainer from '@/src/components/layouts/SectionContainer'
import ArticlesAll from '@/src/components/sections/ArticlesSection/ArticlesAll'
import ArticlesByCategory from '@/src/components/sections/ArticlesSection/ArticlesByCategory'
import { ArticlesSectionFragment } from '@/src/services/graphql'

type Props = {
  section: ArticlesSectionFragment
}

const ArticlesSection = ({ section }: Props) => {
  return (
    <SectionContainer>
      {section.showAll ? (
        <ArticlesAll section={section} />
      ) : (
        <ArticlesByCategory section={section} />
      )}
    </SectionContainer>
  )
}

export default ArticlesSection
