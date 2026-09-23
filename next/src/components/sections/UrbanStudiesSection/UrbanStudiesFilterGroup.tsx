import { SingleSelection } from '@react-types/shared'
import { useQuery } from '@tanstack/react-query'

import SelectField, { SelectItem } from '@/src/components/common/SelectField/SelectField'
import { client } from '@/src/services/graphql/gql'
import { UrbanStudiesFilters } from '@/src/services/meili/fetchers/urbanStudiesFetcher'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  filters: UrbanStudiesFilters
  onFiltersChange: (filters: UrbanStudiesFilters) => void
}

const UrbanStudiesFilterGroup = ({ filters, onFiltersChange }: Props) => {
  const { t } = useTranslation()

  const { data: categories } = useQuery({
    queryKey: ['UrbanStudyCategories'],
    queryFn: () => client.UrbanStudyCategories(),
    staleTime: Infinity,
    select: (res) => res.urbanStudyCategories.filter(isDefined),
  })

  const { data: states } = useQuery({
    queryKey: ['UrbanStudyStates'],
    queryFn: () => client.UrbanStudyStates(),
    staleTime: Infinity,
    select: (res) => res.urbanStudyStates.filter(isDefined),
  })

  const categoriesSelectItems = [
    {
      title: t('UrbanStudiesFilterGroup.allCategories'),
      slug: 'all',
    },
    ...(categories ?? []),
  ]

  const statesSelectItems = [
    {
      title: t('UrbanStudiesFilterGroup.allStates'),
      slug: 'all',
    },
    ...(states ?? []),
  ]

  const handleCategoryChange = (selectedCategory: SingleSelection['selectedKey']) => {
    onFiltersChange({
      ...filters,
      categories:
        typeof selectedCategory === 'string' && selectedCategory !== 'all'
          ? [selectedCategory]
          : [],
      page: 1,
    })
  }

  const handleStateChange = (selectedState: SingleSelection['selectedKey']) => {
    onFiltersChange({
      ...filters,
      state:
        typeof selectedState === 'string' && selectedState !== 'all' ? selectedState : undefined,
      page: 1,
    })
  }

  return (
    <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
      <SelectField
        label={t('UrbanStudiesFilterGroup.categoryLabel')}
        items={categoriesSelectItems}
        selectedKey={filters.categories?.[0] ?? null}
        placeholder={t('UrbanStudiesFilterGroup.allCategories')}
        onSelectionChange={handleCategoryChange}
      >
        {(item) => <SelectItem label={item.title} id={item.slug} />}
      </SelectField>
      <SelectField
        label={t('UrbanStudiesFilterGroup.stateLabel')}
        items={statesSelectItems}
        selectedKey={filters.state ?? null}
        placeholder={t('UrbanStudiesFilterGroup.allStates')}
        onSelectionChange={handleStateChange}
      >
        {(item) => <SelectItem label={item.title} id={item.slug} />}
      </SelectField>
    </div>
  )
}

export default UrbanStudiesFilterGroup
