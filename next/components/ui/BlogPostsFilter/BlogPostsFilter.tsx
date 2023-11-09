import {
  Enum_Pagecategory_Color,
  PageCategoryEntityFragment,
  TagEntityFragment,
} from '@backend/graphql'
import Chip from '@components/forms/simple-components/Chip'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { isDefined } from '@utils/isDefined'
import { useLocale, useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { Label, Selection, TagGroup, TagList, Text } from 'react-aria-components'

type BlogPostsFilterProps = {
  pageCategories: PageCategoryEntityFragment[]
  blogPostsTags?: TagEntityFragment[]
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
        return tag.attributes?.pageCategory?.data?.id === Array.from(pageCategory)[0]
      })
      .map((subTag) => subTag?.id ?? '') ?? []
  )
}

const BlogPostsFilter = ({
  pageCategories,
  blogPostsTags,
  subtext,
  onTagChange,
}: BlogPostsFilterProps) => {
  const t = useTranslations('BlogPostsFilter')
  const locale = useLocale()

  const defaultChip = {
    id: '0',
    title: t('allArticles'),
    color: Enum_Pagecategory_Color.Red,
  }

  const [selectedPageCategory, setSelectedPageCategory] = useState<Selection>(
    new Set<string>(defaultChip.id),
  )
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set<string>())

  useEffect(() => {
    onTagChange(Array.from(selectedTags, (item) => item.toString()))
    if (Array.from(selectedTags).length === 0) {
      onTagChange(filterTagsByPageCategory(blogPostsTags ?? [], selectedPageCategory))
    }
  }, [selectedTags])

  useEffect(() => {
    setSelectedTags(new Set<string>())
    onTagChange(filterTagsByPageCategory(blogPostsTags ?? [], selectedPageCategory))
    if (Array.from(selectedPageCategory).length === 0) {
      setSelectedPageCategory(new Set(defaultChip.id))
    }
  }, [selectedPageCategory])

  useEffect(() => {
    setSelectedPageCategory(new Set(defaultChip.id))
    setSelectedTags(new Set<string>())
  }, [locale])

  return (
    <div className="flex flex-col gap-6 py-18 lg:m-auto lg:w-[800px] lg:gap-10 lg:py-18">
      <div>
        <p>pageCategory: {selectedPageCategory}</p>
        <p>tags: {selectedTags}</p>
      </div>
      <div className="flex flex-col gap-2 lg:items-center ">
        <Label className="text-h3 font-semibold">{t('articleFilter')}</Label>
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
                if (!pagecategory.id || !pagecategory.attributes?.title) {
                  return null
                }
                return (
                  <Chip
                    variant="large"
                    key={pagecategory.id}
                    id={pagecategory.id}
                    style={getCategoryColorLocalStyle({ color: pagecategory.attributes.color })}
                  >
                    {pagecategory.attributes.title}
                  </Chip>
                )
              })
              .filter(isDefined)}
          </TagList>
        </TagGroup>
        {Array.from(selectedPageCategory)[0] !== defaultChip.id &&
        Array.from(selectedPageCategory)?.length &&
        blogPostsTags?.length ? (
          <div className="flex flex-col pt-8 lg:items-center">
            {Array.from(selectedPageCategory).length > 0 ? (
              <Label className="text-h5 pb-3 font-semibold">{t('subcategories')}</Label>
            ) : null}
            <TagGroup
              selectionMode="multiple"
              selectedKeys={selectedTags}
              onSelectionChange={setSelectedTags}
            >
              <TagList className="flex flex-wrap gap-2 lg:justify-center">
                {blogPostsTags
                  .filter(isDefined)
                  .filter((tag) => {
                    return (
                      tag.attributes?.pageCategory?.data?.id === Array.from(selectedPageCategory)[0]
                    )
                  })
                  .map((tag) => {
                    if (!tag.id || !tag.attributes?.title) return null
                    return (
                      <Chip
                        variant="small"
                        style={getCategoryColorLocalStyle({
                          color:
                            tag.attributes.pageCategory?.data?.attributes?.color ??
                            Enum_Pagecategory_Color.Red,
                        })}
                        key={tag.id}
                        id={tag.id}
                      >
                        {tag.attributes.title}
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

export default BlogPostsFilter
