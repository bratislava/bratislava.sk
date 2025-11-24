import { Typography } from '@bratislava/component-library'
import { Label, Tag, TagGroup, TagList } from 'react-aria-components'

import { ChevronDownIcon, CrossIcon, CrossInCircleIcon } from '@/src/assets/icons'
import Button from '@/src/components/common/Button/Button'
import {
  ActiveFiltersTags,
  useActiveFilters,
} from '@/src/components/sections/ArticlesSection/useActiveFilters'
import { useArticlesFilters } from '@/src/components/sections/ArticlesSection/useArticlesFilters'
import { articlesDefaultFilters } from '@/src/services/meili/fetchers/articlesFetcher'
import cn from '@/src/utils/cn'
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
  className?: string
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
  className,
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

  return (
    <TagGroup
      selectionMode="none"
      className={cn('flex flex-col gap-4', className)}
      onRemove={(item) => {
        // items are stored as a Set
        const itemLabel = Array.from(item.values())[0]
        const activeTag = activeFiltersTags.find((tag) => tag.label === itemLabel)
        activeTag?.handleRemove()
      }}
    >
      {/* Screen: desktop */}
      <div className="max-lg:hidden">
        <div className="flex flex-wrap justify-between gap-2 max-lg:flex-col">
          <Label>
            <Typography variant="p-small" className="font-semibold">
              {t('ArticlesAll.activeFilters')}
            </Typography>
          </Label>
          {totalCount ? <Typography variant="p-small">{articlesCountMessage}</Typography> : null}
        </div>
        <ArticlesActiveFiltersTagList
          activeFiltersTags={activeFiltersTags}
          setFilters={setFilters}
        />
      </div>
      {/* Screen: mobile */}
      <div className="flex flex-col gap-4 lg:hidden">
        <details className="group">
          <summary className="flex flex-wrap justify-between gap-2 max-lg:flex-col">
            <div className="flex justify-between">
              <Label>
                <Typography variant="p-small" className="font-semibold">
                  {t('ArticlesAll.activeFilters')}
                </Typography>
              </Label>
              <ChevronDownIcon className="size-5 shrink-0 transition-transform group-open:rotate-180" />
            </div>
          </summary>
          <ArticlesActiveFiltersTagList
            activeFiltersTags={activeFiltersTags}
            setFilters={setFilters}
          />
        </details>
        {totalCount ? <Typography variant="p-small">{articlesCountMessage}</Typography> : null}
      </div>
    </TagGroup>
  )
}

export default ArticlesActiveFilters
