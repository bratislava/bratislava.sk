import { ComponentSectionsArticlesListFragment } from '@bratislava/strapi-sdk-homepage'
import React from 'react'

import ArticlesList from './ArticlesList'

type ArticlesListSectionProps = { section: ComponentSectionsArticlesListFragment; locale: string }

const ArticlesListSection = ({ section, locale }: ArticlesListSectionProps) => {
  return (
    <ArticlesList
      title={section.title}
      includesFiltering={section.filtering}
      category={section.category?.data?.attributes?.title}
      locale={locale}
    />
  )
}

export default ArticlesListSection
