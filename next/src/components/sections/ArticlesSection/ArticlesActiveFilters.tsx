import { Typography } from '@bratislava/component-library'
import { useQuery } from '@tanstack/react-query'
import { Label, Tag, TagGroup, TagList } from 'react-aria-components'

import { CrossIcon, CrossInCircleIcon } from '@/src/assets/icons'
import Button from '@/src/components/common/Button/Button'
import { useArticlesFilters } from '@/src/components/sections/ArticlesSection/useArticlesFilters'
import { client } from '@/src/services/graphql/gql'
import { articlesDefaultFilters } from '@/src/services/meili/fetchers/articlesFetcher'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18995-20544&t=yz1PGIHujiPRt2X4-4
 * Based on RAC TagGroup: https://react-spectrum.adobe.com/react-aria/TagGroup.html
 */

type Props = {
  filters: ReturnType<typeof useArticlesFilters>['filters']
  setFilters: ReturnType<typeof useArticlesFilters>['setFilters']
  pageSize: number | undefined
  totalCount: number | undefined
}

// TODO Make this component more generic, independent of articles
// TODO Add mobile view using accordion

const ArticlesActiveFilters = ({ filters, setFilters, totalCount, pageSize }: Props) => {
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

  const activeTags = [
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
      return {
        slug: adminGroupSlug,
        label: adminGroups?.find((adminGroup) => adminGroup.slug === adminGroupSlug)?.title,
        handleRemove: () => {
          setFilters({
            ...filters,
            adminGroupSlugs: filters.adminGroupSlugs.filter((slug) => slug !== adminGroupSlug),
          })
        },
      }
    }),
    // City hall (it has no admin group, so it is handled separately)
    filters.excludeArticlesWithAssignedAdminGroups
      ? {
          label: t('ArticlesFilterGroup.cityHall'),
          handleRemove: () => {
            setFilters({
              ...filters,
              excludeArticlesWithAssignedAdminGroups: false,
            })
          },
        }
      : null,
  ].filter(isDefined)

  const articlesCountMessage = t('ArticlesAll.resultsCountMessage', {
    count: pageSize,
    totalCount,
  })

  //   return totalCount ? (
  //     <Typography variant="p-small">
  //       {t('ArticlesAll.resultsCountMessage', {
  //         count: pageSize,
  //         totalCount,
  //       })}
  //     </Typography>
  //   ) : null
  // })

  if (activeTags.length === 0 && totalCount) {
    return (
      <Typography variant="p-small" className="lg:ml-auto">
        {articlesCountMessage}
      </Typography>
    )
  }

  return (
    <TagGroup
      selectionMode="single"
      className="flex flex-col gap-4"
      onRemove={(item) => {
        const itemLabel = Array.from(item.values())[0]
        const activeTag = activeTags.find((tag) => tag.label === itemLabel)
        activeTag?.handleRemove()
      }}
    >
      <div className="flex flex-wrap justify-between gap-2 max-lg:flex-col">
        <Label>
          <Typography variant="p-small" className="font-semibold">
            {t('ArticlesAll.activeFilters')}
          </Typography>
        </Label>
        {totalCount ? <Typography variant="p-small">{articlesCountMessage}</Typography> : null}
      </div>
      <div className="flex flex-wrap gap-2">
        <TagList className="flex flex-wrap gap-2">
          {activeTags.map((tag) => (
            <Tag
              className="base-focus-ring relative flex w-fit items-center gap-2 rounded-lg border border-background-passive-secondary bg-background-passive-secondary px-3 py-2 text-content-active-primary-default hover:border-border-active-primary-hover hover:text-content-active-primary-hover"
              key={tag.label}
              id={tag.label}
            >
              <Typography variant="p-small" className="font-medium">
                {tag.label}
              </Typography>
              <Button
                slot="remove"
                variant="icon-wrapped-negative-margin"
                size="small"
                // TODO icon size
                icon={<CrossIcon />}
                stretched
                aria-label={t('ArticlesFilterGroup.removeFilter', {
                  label: tag.label,
                })}
                onPress={tag.handleRemove}
                onKeyDown={tag.handleRemove}
              />
            </Tag>
          ))}
        </TagList>
        {activeTags.length > 0 ? (
          <Button
            variant="outline"
            size="small"
            // TODO icon size
            endIcon={<CrossInCircleIcon />}
            aria-label={t('ArticlesFilterGroup.clearAllFilters')}
            onPress={() => {
              setFilters(articlesDefaultFilters)
            }}
          >
            <Typography variant="p-small" className="font-medium">
              {t('ArticlesFilterGroup.clearAllFilters')}
            </Typography>
          </Button>
        ) : null}
      </div>
    </TagGroup>
  )
}

export default ArticlesActiveFilters
