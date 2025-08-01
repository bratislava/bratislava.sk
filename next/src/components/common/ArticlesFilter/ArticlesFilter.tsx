import React, { useEffect, useState } from 'react'
import { Label, Selection, TagGroup, TagList, Text } from 'react-aria-components'

import Chip from '@/src/components/common/Chip/Chip'
import {
  Enum_Pagecategory_Color,
  PageCategoryEntityFragment,
  TagEntityFragment,
} from '@/src/services/graphql'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { isDefined } from '@/src/utils/isDefined'
import { useLocale } from '@/src/utils/useLocale'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  pageCategories: PageCategoryEntityFragment[]
  tags?: TagEntityFragment[]
  subtext?: string
  onTagChange: (tags: string[]) => void
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=10282-28799&mode=design&t=nfRPipuoNXasJ4TV-0
 */

// React-aria-components library recommends Selection as a type for selection state, which should behave like a Set object. However, common set methods such as .size and .values don't work on Selection, so as a workaround we transform the Selection to an array

const filterTagsByPageCategory = (tags: TagEntityFragment[], pageCategory: Selection): string[] => {
  return (
    tags
      .filter(isDefined)
      .filter((tag) => {
        return tag.pageCategory?.documentId === Array.from(pageCategory)[0]
      })
      .map((subTag) => subTag?.documentId ?? '') ?? []
  )
}

const ArticlesFilter = ({ pageCategories, tags, subtext, onTagChange }: Props) => {
  const { t } = useTranslation()
  const locale = useLocale()

  const defaultChip = {
    id: '0',
    title: t('ArticlesFilter.allArticles'),
    color: Enum_Pagecategory_Color.Red,
  }

  const [selectedPageCategory, setSelectedPageCategory] = useState<Selection>(
    new Set<string>(defaultChip.id),
  )
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set<string>())

  // FIXME TODO revisit and enable rules
  useEffect(() => {
    onTagChange(Array.from(selectedTags, (item) => item.toString()))
    if (Array.from(selectedTags).length === 0) {
      onTagChange(filterTagsByPageCategory(tags ?? [], selectedPageCategory))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags])

  // FIXME TODO revisit and enable rules
  useEffect(() => {
    setSelectedTags(new Set<string>())
    onTagChange(filterTagsByPageCategory(tags ?? [], selectedPageCategory))
    if (Array.from(selectedPageCategory).length === 0) {
      setSelectedPageCategory(new Set(defaultChip.id))
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedPageCategory])

  // FIXME TODO revisit and enable rules
  useEffect(() => {
    setSelectedPageCategory(new Set(defaultChip.id))
    setSelectedTags(new Set<string>())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <div className="flex flex-col gap-6 py-18 lg:m-auto lg:w-[800px] lg:gap-10 lg:py-18">
      <div className="flex flex-col gap-2 lg:items-center">
        <Label className="text-h3 font-semibold">{t('ArticlesFilter.articleFilter')}</Label>
        {subtext && <Text>{subtext}</Text>}
      </div>
      <div>
        <TagGroup
          selectionMode="single"
          selectedKeys={selectedPageCategory}
          defaultSelectedKeys={defaultChip.id}
          onSelectionChange={setSelectedPageCategory}
        >
          <TagList className="flex flex-wrap gap-3 lg:justify-center">
            <Chip
              variant="large"
              key={defaultChip.id}
              id={defaultChip.id}
              style={getCategoryColorLocalStyle({ color: defaultChip.color })}
            >
              {defaultChip.title}
            </Chip>
            {pageCategories
              .map((pagecategory) => {
                if (!pagecategory.documentId || !pagecategory.title) {
                  return null
                }

                return (
                  <Chip
                    variant="large"
                    key={pagecategory.documentId}
                    id={pagecategory.documentId}
                    style={getCategoryColorLocalStyle({ color: pagecategory.color })}
                  >
                    {pagecategory.title}
                  </Chip>
                )
              })
              .filter(isDefined)}
          </TagList>
        </TagGroup>
        {Array.from(selectedPageCategory)[0] !== defaultChip.id &&
        Array.from(selectedPageCategory)?.length &&
        tags?.length ? (
          <div className="flex flex-col pt-8 lg:items-center">
            {Array.from(selectedPageCategory).length > 0 ? (
              <Label className="pb-3 text-h5 font-semibold">
                {t('ArticlesFilter.subcategories')}
              </Label>
            ) : null}
            <TagGroup
              selectionMode="multiple"
              selectedKeys={selectedTags}
              onSelectionChange={setSelectedTags}
            >
              <TagList className="flex flex-wrap gap-2 lg:justify-center">
                {tags
                  .filter(isDefined)
                  .filter((tag) => {
                    return tag.pageCategory?.documentId === Array.from(selectedPageCategory)[0]
                  })
                  .map((tag) => {
                    if (!tag.documentId || !tag.title) return null

                    return (
                      <Chip
                        variant="small"
                        style={getCategoryColorLocalStyle({
                          color: tag.pageCategory?.color ?? Enum_Pagecategory_Color.Red,
                        })}
                        key={tag.documentId}
                        id={tag.documentId}
                      >
                        {tag.title}
                      </Chip>
                    )
                  })}
              </TagList>
            </TagGroup>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default ArticlesFilter
