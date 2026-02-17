import { SingleSelection } from '@react-types/shared'
import { useQuery } from '@tanstack/react-query'
import React from 'react'

import SelectField, { SelectItem } from '@/src/components/common/SelectField/SelectField'
import { client } from '@/src/services/graphql/gql'
import { AssetsFilters } from '@/src/services/meili/fetchers/assetsFetcher'
import { useGetCityHallAdminGroup } from '@/src/utils/adminGroupUtils'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  filters: AssetsFilters
  onFiltersChange: (filters: AssetsFilters) => void
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-35571&m=dev
 */

const AssetsFilterGroup = ({ filters, onFiltersChange }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { data: assetCategories } = useQuery({
    queryKey: ['AssetCategories', locale],
    queryFn: () => client.AssetCategories(),
    staleTime: Infinity,
    select: (res) => res.assetCategories.filter(isDefined) ?? [],
  })

  const assetCategoriesSelectItems = [
    {
      title: t('AssetsFilterGroup.allAssetCategories'),
      slug: 'all',
    },
    ...(assetCategories ?? []),
  ]

  const { data: adminGroups } = useQuery({
    queryKey: ['AdminGroups'],
    queryFn: () => client.AdminGroups(),
    staleTime: Infinity,
    select: (res) => res.adminGroups .filter(isDefined) ?? [],
  })

  const { CITY_HALL_ADMINGROUP } = useGetCityHallAdminGroup()

  const adminGroupsSelectItems = [
    {
      title: t('AssetsFilterGroup.allAdminGroups'),
      slug: 'all',
    },
    CITY_HALL_ADMINGROUP,
    ...(adminGroups ?? []),
  ]

  const handleCategoryChange = (selectedCategory: SingleSelection['selectedKey']) => {
    onFiltersChange({
      ...filters,
      assetCategorySlugs:
        typeof selectedCategory === 'string' && selectedCategory !== 'all'
          ? [selectedCategory]
          : [],
      page: 1,
    })
  }

  const handleAuthorChange = (selectedAdminGroup: SingleSelection['selectedKey']) => {
    if (selectedAdminGroup === CITY_HALL_ADMINGROUP.slug) {
      onFiltersChange({
        ...filters,
        adminGroupSlugs: [],
        excludeAssetsWithAssignedAdminGroups: true,
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
      excludeAssetsWithAssignedAdminGroups: false,
      page: 1,
    })
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <SelectField
        label={t('AssetsFilterGroup.categoryLabel')}
        items={assetCategoriesSelectItems}
        selectedKey={filters.assetCategorySlugs?.[0] ?? null}
        placeholder={t('AssetsFilterGroup.allAssetCategories')}
        onSelectionChange={handleCategoryChange}
      >
        {(item) => <SelectItem label={item.title} id={item.slug} />}
      </SelectField>
      <SelectField
        label={t('AssetsFilterGroup.adminGroupLabel')}
        items={adminGroupsSelectItems}
        selectedKey={
          filters.excludeAssetsWithAssignedAdminGroups
            ? CITY_HALL_ADMINGROUP.slug
            : (filters.adminGroupSlugs?.[0] ?? null)
        }
        placeholder={t('AssetsFilterGroup.allAdminGroups')}
        onSelectionChange={handleAuthorChange}
      >
        {(item) => <SelectItem label={item.title} id={item.slug ?? ''} />}
      </SelectField>
    </div>
  )
}

export default AssetsFilterGroup
