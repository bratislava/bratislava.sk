import { SingleSelection } from '@react-types/shared'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import SelectField, { SelectItem } from '@/src/components/common/SelectField/SelectField'
import { client } from '@/src/services/graphql/gql'
import { ArticlesFilters } from '@/src/services/meili/fetchers/articlesFetcher'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  filters: ArticlesFilters
  onFiltersChange: (filters: ArticlesFilters) => void
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-35571&m=dev
 */

const ArticlesFilterGroup = ({ filters, onFiltersChange }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { data: articleCategories } = useQuery({
    queryKey: ['ArticleCategories', locale],
    queryFn: () => client.ArticleCategories({ locale }),
    staleTime: Infinity,
    select: (res) => res.articleCategories.filter(isDefined) ?? [],
  })

  const articleCategoriesSelectItems = [
    {
      title: t('ArticlesFilterGroup.allArticleCategories'),
      slug: 'all',
    },
    ...(articleCategories ?? []),
  ]

  const { data: tags } = useQuery({
    queryKey: ['Tags', locale],
    queryFn: () => client.Tags({ locale }),
    staleTime: Infinity,
    select: (res) => res.tags.filter(isDefined) ?? [],
  })

  const tagsSelectItems = [
    {
      title: t('ArticlesFilterGroup.allTags'),
      slug: 'all',
    },
    ...(tags ?? []),
  ]

  const { data: adminGroups } = useQuery({
    queryKey: ['AdminGroups'],
    queryFn: () => client.AdminGroups(),
    staleTime: Infinity,
    select: (res) =>
      res.adminGroups
        .filter(isDefined)
        // TODO remove this last filter after slug is set to required
        .filter((adminGroup) => adminGroup.slug) ?? [],
  })

  // "City Hall" is a special option that means articles without any assigned admin group
  // It is not present in the admin groups list in strapi, so we add it here manually
  const CITY_HALL_SELECT_ITEM = {
    title: t('ArticlesFilterGroup.cityHall'),
    slug: t('ArticlesFilterGroup.cityHall'),
  }

  const adminGroupsSelectItems = [
    {
      title: t('ArticlesFilterGroup.allAdminGroups'),
      slug: 'all',
    },
    CITY_HALL_SELECT_ITEM,
    ...(adminGroups ?? []),
  ]

  const handleCategoryChange = (selectedCategory: SingleSelection['selectedKey']) => {
    onFiltersChange({
      ...filters,
      articleCategorySlugs:
        typeof selectedCategory === 'string' && selectedCategory !== 'all'
          ? [selectedCategory]
          : [],
      page: 1,
    })
  }

  const handleTagChange = (selectedTag: SingleSelection['selectedKey']) => {
    onFiltersChange({
      ...filters,
      tagSlugs: typeof selectedTag === 'string' && selectedTag !== 'all' ? [selectedTag] : [],
      page: 1,
    })
  }

  const handleAuthorChange = (selectedAdminGroup: SingleSelection['selectedKey']) => {
    if (selectedAdminGroup === CITY_HALL_SELECT_ITEM.slug) {
      onFiltersChange({
        ...filters,
        adminGroupSlugs: [],
        excludeArticlesWithAssignedAdminGroups: true,
        page: 1,
      })

      return
    }

    onFiltersChange({
      ...filters,
      adminGroupSlugs:
        typeof selectedAdminGroup === 'string' && selectedAdminGroup !== 'all'
          ? [selectedAdminGroup]
          : [],
      excludeArticlesWithAssignedAdminGroups: false,
      page: 1,
    })
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-3">
      <SelectField
        label={t('ArticlesFilterGroup.categoryLabel')}
        items={articleCategoriesSelectItems}
        selectedKey={filters.articleCategorySlugs?.[0] ?? null}
        placeholder={t('ArticlesFilterGroup.allArticleCategories')}
        onSelectionChange={handleCategoryChange}
      >
        {(item) => <SelectItem label={item.title} id={item.slug} />}
      </SelectField>
      <SelectField
        label={t('ArticlesFilterGroup.tagLabel')}
        items={tagsSelectItems}
        selectedKey={filters.tagSlugs?.[0] ?? null}
        placeholder={t('ArticlesFilterGroup.allTags')}
        onSelectionChange={handleTagChange}
      >
        {(item) => (
          <SelectItem
            label={item.title}
            // TODO remove ?? '' after slug is set to required
            id={item.slug ?? ''}
          />
        )}
      </SelectField>
      <SelectField
        label={t('ArticlesFilterGroup.adminGroupLabel')}
        items={adminGroupsSelectItems}
        selectedKey={
          filters.excludeArticlesWithAssignedAdminGroups
            ? CITY_HALL_SELECT_ITEM.title
            : (filters.adminGroupSlugs?.[0] ?? null)
        }
        placeholder={t('ArticlesFilterGroup.allAdminGroups')}
        onSelectionChange={handleAuthorChange}
      >
        {(item) => (
          <SelectItem
            label={item.title}
            // TODO remove ?? '' after slug is set to required
            id={item.slug ?? ''}
          />
        )}
      </SelectField>
    </div>
  )
}

export default ArticlesFilterGroup
