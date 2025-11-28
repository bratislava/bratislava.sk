import { Typography } from '@bratislava/component-library'
import { Key, Label, Tag, TagGroup, TagGroupProps, TagList } from 'react-aria-components'

import { ChevronDownIcon, CrossIcon, CrossInCircleIcon } from '@/src/assets/icons'
import Button from '@/src/components/common/Button/Button'
import {
  ActiveFiltersTags,
  useActiveFilters,
} from '@/src/components/sections/ArticlesSection/ArticlesAll/ArticlesActiveFilters/useArticlesActiveFilters'
import { useArticlesFilters } from '@/src/components/sections/ArticlesSection/ArticlesAll/useArticlesFilters'
import { articlesDefaultFilters } from '@/src/services/meili/fetchers/articlesFetcher'
import { useTranslation } from '@/src/utils/useTranslation'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18995-20544&t=yz1PGIHujiPRt2X4-4
 * Based on RAC TagGroup: https://react-spectrum.adobe.com/react-aria/TagGroup.html
 */

export type ArticlesActiveFiltersProps = {
  filters: ReturnType<typeof useArticlesFilters>['filters']
  setFilters: ReturnType<typeof useArticlesFilters>['setFilters']
  currentResultsCount: number
  totalCount: number
}

type ArticlesActiveFiltersTagListProps = {
  activeFiltersTags: ActiveFiltersTags
  setFilters: ArticlesActiveFiltersProps['setFilters']
}

const ArticlesActiveFiltersTagList = ({
  activeFiltersTags,
  setFilters,
}: ArticlesActiveFiltersTagListProps) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-2 pt-4">
      <TagList className="flex flex-wrap gap-2" items={activeFiltersTags}>
        {(item) => {
          const { label, slug, handleRemove } = item

          return (
            <Tag
              className="base-focus-ring relative flex w-fit items-center gap-2 rounded-lg border border-background-passive-secondary bg-background-passive-secondary px-3 py-2 text-content-active-primary-default hover:border-border-active-primary-hover hover:text-content-active-primary-hover"
              id={slug}
            >
              <Typography variant="p-small" className="font-medium">
                {label}
              </Typography>
              <Button
                slot="remove"
                variant="icon-wrapped-negative-margin"
                size="small"
                // TODO icon size
                icon={<CrossIcon />}
                stretched
                aria-label={t('ArticlesActiveFilters.removeFilter', { label })}
                onPress={handleRemove}
              />
            </Tag>
          )
        }}
      </TagList>
      {activeFiltersTags.length > 0 ? (
        <Button
          variant="outline"
          size="small"
          // TODO icon size
          endIcon={<CrossInCircleIcon />}
          onPress={() => {
            setFilters(articlesDefaultFilters)
          }}
        >
          <Typography variant="p-small" className="font-medium">
            {t('ArticlesActiveFilters.clearAllFilters')}
          </Typography>
        </Button>
      ) : null}
    </div>
  )
}

const ArticlesActiveFilters = ({
  filters,
  setFilters,
  totalCount,
  currentResultsCount,
}: ArticlesActiveFiltersProps) => {
  const { t } = useTranslation()

  const { activeFiltersTags } = useActiveFilters({ filters, setFilters })

  const articlesCountMessage = t('ArticlesAll.resultsCountMessage', {
    count: currentResultsCount,
    totalCount,
  })

  // If no filters are selected and there are some results, show only this message
  if (activeFiltersTags.length === 0 && totalCount) {
    return (
      <Typography variant="p-small" className="lg:ml-auto">
        {articlesCountMessage}
      </Typography>
    )
  }

  const removeActiveTag = (selection: Set<Key>) => {
    const slugToRemove = Array.from(selection.values())[0]
    const activeTagToRemove = activeFiltersTags.find((tag) => tag.slug === slugToRemove)
    activeTagToRemove?.handleRemove()
  }

  const labelElement = (
    <Label>
      <Typography variant="p-small" className="font-semibold">
        {t('ArticlesAll.activeFilters')}
      </Typography>
    </Label>
  )

  const totalCountElement = totalCount ? (
    <Typography variant="p-small">{articlesCountMessage}</Typography>
  ) : null

  const tagGroupProps: TagGroupProps = {
    selectionMode: 'none',
    onRemove: removeActiveTag,
  }
  const tagListProps: ArticlesActiveFiltersTagListProps = { activeFiltersTags, setFilters }

  return (
    <>
      {/* Screen: desktop */}
      <TagGroup {...tagGroupProps} className="max-lg:hidden">
        <div className="flex flex-wrap justify-between gap-2 max-lg:flex-col">
          {labelElement}
          {totalCountElement}
        </div>
        <ArticlesActiveFiltersTagList {...tagListProps} />
      </TagGroup>
      {/* Screen: mobile */}
      <TagGroup {...tagGroupProps} className="flex flex-col gap-4 lg:hidden">
        <details className="group">
          <summary className="flex justify-between">
            {labelElement}
            <ChevronDownIcon className="size-5 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          <ArticlesActiveFiltersTagList {...tagListProps} />
        </details>
        {totalCountElement}
      </TagGroup>
    </>
  )
}

export default ArticlesActiveFilters
