import { Typography } from '@bratislava/component-library'
import { Key, Label, Tag, TagGroup, TagGroupProps, TagList } from 'react-aria-components'

import { ChevronDownIcon, CrossIcon, CrossInCircleIcon } from '@/src/assets/icons'
import Button from '@/src/components/common/Button/Button'
import {
  ActiveFiltersTags,
  useActiveFilters,
} from '@/src/components/sections/ArticlesSection/ArticlesAll/useActiveFilters'
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

const ArticlesActiveFiltersTagList = ({
  activeFiltersTags,
  setFilters,
}: {
  activeFiltersTags: ActiveFiltersTags
  setFilters: ArticlesActiveFiltersProps['setFilters']
}) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap gap-2 pt-4">
      <TagList className="flex flex-wrap gap-2">
        {activeFiltersTags.map((tag) => {
          const { label, handleRemove } = tag

          return (
            <Tag
              className="base-focus-ring relative flex w-fit items-center gap-2 rounded-lg border border-background-passive-secondary bg-background-passive-secondary px-3 py-2 text-content-active-primary-default hover:border-border-active-primary-hover hover:text-content-active-primary-hover"
              key={label}
              id={label}
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
        })}
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

// TODO Make this component more generic, independent of articles
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

  const handleRemove = (item: Set<Key>) => {
    const itemLabel = Array.from(item.values())[0]
    const activeTag = activeFiltersTags.find((tag) => tag.label === itemLabel)
    activeTag?.handleRemove()
  }

  const tagListElement = (
    <ArticlesActiveFiltersTagList activeFiltersTags={activeFiltersTags} setFilters={setFilters} />
  )

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

  const tagGroupProps: TagGroupProps = { selectionMode: 'none', onRemove: handleRemove }

  return (
    <>
      {/* Screen: desktop */}
      <TagGroup {...tagGroupProps} className="max-lg:hidden">
        <div className="flex flex-wrap justify-between gap-2 max-lg:flex-col">
          {labelElement}
          {totalCountElement}
        </div>
        {tagListElement}
      </TagGroup>
      {/* Screen: mobile */}
      <TagGroup {...tagGroupProps} className="flex flex-col gap-4 lg:hidden">
        <details className="group">
          <summary className="flex flex-wrap justify-between gap-2 max-lg:flex-col">
            {labelElement}
            <ChevronDownIcon className="size-5 shrink-0 transition-transform group-open:rotate-180" />
          </summary>
          {tagListElement}
        </details>
        {totalCountElement}
      </TagGroup>
    </>
  )
}

export default ArticlesActiveFilters
