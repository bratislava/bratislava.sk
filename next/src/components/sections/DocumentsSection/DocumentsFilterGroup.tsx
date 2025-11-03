import { SingleSelection } from '@react-types/shared'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import SelectField, { SelectItem } from '@/src/components/common/SelectField/SelectField'
import { client } from '@/src/services/graphql/gql'
import { DocumentsFilters } from '@/src/services/meili/fetchers/documentsFetcher'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  filters: DocumentsFilters
  onFiltersChange: (filters: DocumentsFilters) => void
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-35571&m=dev
 */

const DocumentsFilterGroup = ({ filters, onFiltersChange }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { data: documentCategories } = useQuery({
    queryKey: ['DocumentCategories', locale],
    queryFn: () => client.DocumentCategories(),
    staleTime: Infinity,
    select: (res) => res.documentCategories.filter(isDefined) ?? [],
  })

  const documentCategoriesSelectItems = [
    {
      title: t('DocumentsFilterGroup.allDocumentCategories'),
      slug: 'all',
    },
    ...(documentCategories ?? []),
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

  // "City Hall" is a special option that means documents without any assigned admin group
  // It is not present in the admin groups list in strapi, so we add it here manually
  const CITY_HALL_SELECT_ITEM = {
    title: t('DocumentsFilterGroup.cityHall'),
    slug: t('DocumentsFilterGroup.cityHall'),
  }

  const adminGroupsSelectItems = [
    {
      title: t('DocumentsFilterGroup.allAdminGroups'),
      slug: 'all',
    },
    CITY_HALL_SELECT_ITEM,
    ...(adminGroups ?? []),
  ]

  const handleCategoryChange = (selectedCategory: SingleSelection['selectedKey']) => {
    onFiltersChange({
      ...filters,
      documentCategorySlugs:
        typeof selectedCategory === 'string' && selectedCategory !== 'all'
          ? [selectedCategory]
          : [],
      page: 1,
    })
  }

  const handleAuthorChange = (selectedAdminGroup: SingleSelection['selectedKey']) => {
    if (selectedAdminGroup === CITY_HALL_SELECT_ITEM.slug) {
      onFiltersChange({
        ...filters,
        adminGroupSlugs: [],
        excludeDocumentsWithAssignedAdminGroups: true,
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
      excludeDocumentsWithAssignedAdminGroups: false,
      page: 1,
    })
  }

  return (
    <div className="grid grid-cols-1 gap-x-4 gap-y-4 lg:grid-cols-2">
      <SelectField
        label={t('DocumentsFilterGroup.categoryLabel')}
        items={documentCategoriesSelectItems}
        selectedKey={filters.documentCategorySlugs?.[0] ?? null}
        placeholder={t('DocumentsFilterGroup.allDocumentCategories')}
        onSelectionChange={handleCategoryChange}
      >
        {(item) => <SelectItem label={item.title} id={item.slug} />}
      </SelectField>
      <SelectField
        label={t('DocumentsFilterGroup.adminGroupLabel')}
        items={adminGroupsSelectItems}
        selectedKey={
          filters.excludeDocumentsWithAssignedAdminGroups
            ? CITY_HALL_SELECT_ITEM.title
            : (filters.adminGroupSlugs?.[0] ?? null)
        }
        placeholder={t('DocumentsFilterGroup.allAdminGroups')}
        onSelectionChange={handleAuthorChange}
      >
        {(item) => <SelectItem label={item.title} id={item.slug ?? ''} />}
      </SelectField>
    </div>
  )
}

export default DocumentsFilterGroup
