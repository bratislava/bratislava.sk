import React from 'react'

import SectionContainer from '@/src/components/layouts/SectionContainer'
import ArticlesAll from '@/src/components/sections/ArticlesSection/ArticlesAll/ArticlesAll'
import ArticlesFiltered from '@/src/components/sections/ArticlesSection/ArticlesFiltered'
import { ArticlesSectionFragment } from '@/src/services/graphql'

type Props = {
  section: ArticlesSectionFragment
}

const ArticlesSection = ({ section }: Props) => {
  return (
    <SectionContainer>
      {section.showAll ? <ArticlesAll section={section} /> : <ArticlesFiltered section={section} />}
    </SectionContainer>
  )
}

export default ArticlesSection
