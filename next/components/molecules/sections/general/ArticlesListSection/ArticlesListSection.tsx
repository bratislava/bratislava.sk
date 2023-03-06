import { ComponentSectionsArticlesListFragment } from '@bratislava/strapi-sdk-homepage'
import { isPresent } from '@utils/utils'
import React from 'react'

import ArticlesList from './ArticlesList'

type ArticlesListSectionProps = { section: ComponentSectionsArticlesListFragment; locale: string }

const ArticlesListSection = ({ section, locale }: ArticlesListSectionProps) => {
  if (!isPresent(section.title) || !isPresent(section.filtering)) {
    return null
  }

  return (
    <ArticlesList
      title={section.title}
      includesFiltering={section.filtering}
      category={section.category?.data?.attributes?.title ?? undefined}
      locale={locale}
    />
  )
}

export default ArticlesListSection
