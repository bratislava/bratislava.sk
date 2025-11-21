import { useQuery } from '@tanstack/react-query'

import CheckboxGroup from '@/src/components/sections/ArticlesSection/CheckboxGroup'
import { client } from '@/src/services/graphql/gql'
import {
  ArticlesFilters,
  useGetCityHallAdminGroup,
} from '@/src/services/meili/fetchers/articlesFetcher'
import cn from '@/src/utils/cn'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  filters: ArticlesFilters
  onFiltersChange: (filters: ArticlesFilters) => void
  className?: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-35571&m=dev
 */

const ArticlesCheckboxFilters = ({ filters, onFiltersChange, className }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const { data: articleCategories } = useQuery({
    queryKey: ['ArticleCategories', locale],
    queryFn: () => client.ArticleCategories({ locale }),
    staleTime: Infinity,
    select: (res) => res.articleCategories.filter(isDefined) ?? [],
  })

  const { data: tags } = useQuery({
    queryKey: ['Tags', locale],
    queryFn: () => client.Tags({ locale }),
    staleTime: Infinity,
    select: (res) => res.tags.filter(isDefined) ?? [],
  })

  const { data: adminGroups } = useQuery({
    queryKey: ['AdminGroups'],
    queryFn: () => client.AdminGroups(),
    staleTime: Infinity,
    select: (res) => res.adminGroups.filter(isDefined),
  })

  const { CITY_HALL_ADMINGROUP } = useGetCityHallAdminGroup()

  const authors = [
    { label: CITY_HALL_ADMINGROUP.title, value: CITY_HALL_ADMINGROUP.slug },
    ...(adminGroups?.map((adminGroup) => {
      return { label: adminGroup.title, value: adminGroup.slug }
    }) ?? []),
  ]

  const handleCategoriesChange = (selectedCategories: string[]) => {
    onFiltersChange({
      ...filters,
      articleCategorySlugs: selectedCategories,
      page: 1,
    })
  }

  const handleTagsChange = (selectedTags: string[]) => {
    onFiltersChange({
      ...filters,
      tagSlugs: selectedTags,
      page: 1,
    })
  }

  const handleAuthorsChange = (selectedAuthors: string[]) => {
    onFiltersChange({
      ...filters,
      adminGroupSlugs: selectedAuthors,
      page: 1,
    })
  }

  return (
    <div className={cn('flex flex-col gap-6', className)}>
      <CheckboxGroup
        label={t('ArticlesCheckboxGroup.adminGroupLabel')}
        value={filters.adminGroupSlugs}
        onChange={handleAuthorsChange}
        items={authors}
      />
      {tags ? (
        <CheckboxGroup
          label={t('ArticlesCheckboxGroup.categoryLabel')}
          value={filters.tagSlugs}
          onChange={handleTagsChange}
          items={tags.map((tag) => {
            return { label: tag.title, value: tag.slug }
          })}
        />
      ) : null}
      {articleCategories ? (
        <CheckboxGroup
          label={t('ArticlesCheckboxGroup.tagLabel')}
          value={filters.articleCategorySlugs}
          onChange={handleCategoriesChange}
          items={articleCategories.map((articleCategory) => {
            return { label: articleCategory.title, value: articleCategory.slug }
          })}
        />
      ) : null}
    </div>
  )
}

export default ArticlesCheckboxFilters
