import { useQuery } from '@tanstack/react-query'

import { ArticlesActiveFiltersProps } from '@/src/components/sections/ArticlesSection/ArticlesAll/ArticlesActiveFilters/ArticlesActiveFilters'
import { client } from '@/src/services/graphql/gql'
import { useGetCityHallAdminGroup } from '@/src/utils/adminGroupUtils'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'

export type ActiveFiltersTags = {
  slug: string
  label: string | undefined
  handleRemove: () => void
}[]

export const useActiveFilters = ({
  filters,
  setFilters,
}: Pick<ArticlesActiveFiltersProps, 'filters' | 'setFilters'>) => {
  const locale = useLocale()

  const { data: articleCategories } = useQuery({
    queryKey: ['ArticleCategories', locale],
    queryFn: () => client.ArticleCategories({ locale }),
    staleTime: Infinity,
    select: (res) => res.articleCategories.filter(isDefined),
  })

  const { data: tags } = useQuery({
    queryKey: ['Tags', locale],
    queryFn: () => client.Tags({ locale }),
    staleTime: Infinity,
    select: (res) => res.tags.filter(isDefined),
  })

  const { data: adminGroups } = useQuery({
    queryKey: ['AdminGroups'],
    queryFn: () => client.AdminGroups(),
    staleTime: Infinity,
    select: (res) => res.adminGroups.filter(isDefined),
  })

  const { CITY_HALL_ADMINGROUP } = useGetCityHallAdminGroup()

  const activeFiltersTags = [
    // Article categories
    ...filters.articleCategorySlugs.map((articleCategorySlug) => {
      return {
        slug: articleCategorySlug,
        label: articleCategories?.find(
          (articleCategory) => articleCategory.slug === articleCategorySlug,
        )?.title,
        handleRemove: () => {
          setFilters({
            ...filters,
            articleCategorySlugs: filters.articleCategorySlugs.filter(
              (slug) => slug !== articleCategorySlug,
            ),
          })
        },
      }
    }),
    // Tags
    ...filters.tagSlugs.map((tagSlug) => {
      return {
        slug: tagSlug,
        label: tags?.find((tag) => tag.slug === tagSlug)?.title,
        handleRemove: () => {
          setFilters({
            ...filters,
            tagSlugs: filters.tagSlugs.filter((slug) => slug !== tagSlug),
          })
        },
      }
    }),
    // Admin groups
    ...filters.adminGroupSlugs.map((adminGroupSlug) => {
      const adminGroupsWithCityHall = [...(adminGroups ?? []), CITY_HALL_ADMINGROUP]

      return {
        slug: adminGroupSlug,
        label: adminGroupsWithCityHall.find((adminGroup) => adminGroup.slug === adminGroupSlug)
          ?.title,
        handleRemove: () => {
          setFilters({
            ...filters,
            adminGroupSlugs: filters.adminGroupSlugs.filter((slug) => slug !== adminGroupSlug),
          })
        },
      }
    }),
  ]

  return { activeFiltersTags } satisfies { activeFiltersTags: ActiveFiltersTags }
}
