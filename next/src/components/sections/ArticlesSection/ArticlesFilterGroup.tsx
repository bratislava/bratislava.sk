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
      documentId: '',
    },
    ...(articleCategories ?? []),
  ]

  const { data: tags } = useQuery({
    queryKey: ['Tags', locale],
    queryFn: () => client.Tags({ locale }),
    staleTime: Infinity,
    select: (res) => res.tags.filter(isDefined),
  })

  const tagsSelectItems = [
    {
      title: t('ArticlesFilterGroup.allTags'),
      documentId: '',
    },
    ...(tags ?? []),
  ]

  const { data: adminGroups } = useQuery({
    queryKey: ['AdminGroups'],
    queryFn: () => client.AdminGroups(),
    staleTime: Infinity,
    select: (res) => res.adminGroups.filter(isDefined),
  })

  // "City Hall" is a special option that means articles without any assigned admin group
  // It is not present in the admin groups list in strapi, so we add it here manually
  const CITY_HALL_SELECT_ITEM = {
    title: t('ArticlesFilterGroup.cityHall'),
    documentId: t('ArticlesFilterGroup.cityHall'),
  }

  const adminGroupsSelectItems = [
    {
      title: t('ArticlesFilterGroup.allAdminGroups'),
      documentId: '',
    },
    CITY_HALL_SELECT_ITEM,
    ...(adminGroups ?? []),
  ]

  const handleCategoryChange = (selectedCategoryIds: string) => {
    onFiltersChange({
      ...filters,
      articleCategoryDocumentIds: [selectedCategoryIds].filter((id) => id && id !== ''),
      page: 1,
    })
  }

  const handleTagChange = (selectedTagId: string) => {
    onFiltersChange({
      ...filters,
      tagDocumentIds: [selectedTagId].filter((id) => id && id !== ''),
      page: 1,
    })
  }

  const handleAuthorChange = (selectedAdminGroupId: string) => {
    onFiltersChange({
      ...filters,
      adminGroupDocumentIds:
        selectedAdminGroupId === CITY_HALL_SELECT_ITEM.documentId
          ? []
          : [selectedAdminGroupId].filter((id) => id && id !== ''),
      excludeArticlesWithAssignedAdminGroups:
        selectedAdminGroupId === CITY_HALL_SELECT_ITEM.documentId,
      page: 1,
    })
  }

  return (
    <div className="grid grid-cols-1 gap-x-8 gap-y-4 lg:grid-cols-3">
      <SelectField
        label={t('ArticlesFilterGroup.categoryLabel')}
        items={articleCategoriesSelectItems}
        selectedKey={filters.articleCategoryDocumentIds?.[0] ?? null}
        placeholder={t('ArticlesFilterGroup.allArticleCategories')}
        onSelectionChange={(key) => handleCategoryChange(key?.toString() ?? '')}
      >
        {(item) => <SelectItem label={item.title} id={item.documentId} />}
      </SelectField>
      <SelectField
        label={t('ArticlesFilterGroup.tagLabel')}
        items={tagsSelectItems}
        selectedKey={filters.tagDocumentIds?.[0] ?? null}
        placeholder={t('ArticlesFilterGroup.allTags')}
        onSelectionChange={(key) => handleTagChange(key?.toString() ?? '')}
      >
        {(item) => <SelectItem label={item.title} id={item.documentId} />}
      </SelectField>
      <SelectField
        label={t('ArticlesFilterGroup.adminGroupLabel')}
        items={adminGroupsSelectItems}
        selectedKey={
          filters.excludeArticlesWithAssignedAdminGroups
            ? CITY_HALL_SELECT_ITEM.title
            : (filters.adminGroupDocumentIds?.[0] ?? null)
        }
        placeholder={t('ArticlesFilterGroup.allAdminGroups')}
        onSelectionChange={(key) => handleAuthorChange(key?.toString() ?? '')}
      >
        {(item) => <SelectItem label={item.title} id={item.documentId} />}
      </SelectField>
    </div>
  )
}

export default ArticlesFilterGroup
