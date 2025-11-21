import { Typography } from '@bratislava/component-library'
import { Label, Tag, TagGroup, TagList } from 'react-aria-components'

import { CrossIcon, CrossInCircleIcon } from '@/src/assets/icons'
import Button from '@/src/components/common/Button/Button'
import { useActiveFilters } from '@/src/components/sections/ArticlesSection/useActiveFilters'
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
  pageSize: number
  totalCount: number
  className?: string
}

// TODO Make this component more generic, independent of articles
const ArticlesActiveFilters = ({
  filters,
  setFilters,
  totalCount,
  pageSize,
  className,
}: ArticlesActiveFiltersProps) => {
  const { t } = useTranslation()

  const { activeFilterTags } = useActiveFilters({ filters, setFilters })

  const articlesCountMessage = t('ArticlesAll.resultsCountMessage', {
    count: pageSize,
    totalCount,
  })

  // If no filters are selected and there are some results, show only this message
  if (activeFilterTags.length === 0 && totalCount) {
    return (
      <Typography variant="p-small" className="lg:ml-auto">
        {articlesCountMessage}
      </Typography>
    )
  }

  return (
    <TagGroup
      selectionMode="single"
      className={cn('flex flex-col gap-4', className)}
      onRemove={(item) => {
        // items are stored as a Set
        const itemLabel = Array.from(item.values())[0]
        const activeTag = activeFilterTags.find((tag) => tag.label === itemLabel)
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
          {activeFilterTags.map((tag, index) => {
            const { label, handleRemove } = tag

            return (
                <Tag
                  className="base-focus-ring relative flex w-fit items-center gap-2 rounded-lg border border-background-passive-secondary bg-background-passive-secondary px-3 py-2 text-content-active-primary-default hover:border-border-active-primary-hover hover:text-content-active-primary-hover"
                  key={label}
                  id={label}
                >
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
        {activeFilterTags.length > 0 ? (
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
    </TagGroup>
  )
}

export default ArticlesActiveFilters
