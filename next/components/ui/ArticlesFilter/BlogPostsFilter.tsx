import {
  Enum_Pagecategory_Color,
  PageCategoryEntityFragment,
  TagEntityFragment,
} from '@backend/graphql'
import Chip from '@components/forms/simple-components/Chip'
import { colorCategoryMap, getCategoryColorLocalStyle } from '@utils/colors'
import { isDefined } from '@utils/isDefined'
import { defaultConfig } from 'next/dist/server/config-shared'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { Label, Selection, Tag, TagGroup, TagList, Text } from 'react-aria-components'

export interface BlogPostsFilterProps {
  tags: PageCategoryEntityFragment[]
  subTags?: TagEntityFragment[]
  subtext?: string
  onSubTagChange: (tags: string[]) => void
}

// export interface BlogPostsFilterProps {
//   tags: BlogPostCategory[]
//   subTags?: BlogPostSubCategory[]
//   subtext?: string
//   onSubTagChange: (tags: string[]) => void
// }

export interface BlogPostCategory {
  id: string
  title: string
  color: Enum_Pagecategory_Color
}

export interface BlogPostSubCategory {
  id: string
  title: string
  pageCategoryId: string
  pageCategoryColor: Enum_Pagecategory_Color
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=10282-28799&mode=design&t=nfRPipuoNXasJ4TV-0
 */

const defaultChip = {
  id: '0',
  title: 'Všetky články',
  color: Enum_Pagecategory_Color.Red,
} as BlogPostCategory

const BlogPostsFilter = ({ tags, subTags, subtext, onSubTagChange }: BlogPostsFilterProps) => {
  const t = useTranslations('ArticleFilter')

  const [selectedTag, setSelectedTag] = useState<Selection>(new Set<string>(defaultChip.id))
  const [selectedSubTags, setSelectedSubTags] = useState<Selection>(new Set<string>())

  useEffect(() => {
    onSubTagChange(Array.from(selectedSubTags, (item) => item.toString()))
  }, [selectedSubTags])

  useEffect(() => {
    if (Array.from(selectedTag)[0] === defaultChip.id) {
      setSelectedSubTags(new Set<string>())
    }
  }, [selectedTag])

  return (
    <div className="flex flex-col gap-6 py-18 lg:m-auto lg:w-[800px]  lg:gap-10 lg:py-18">
      {/* DEBUG ↓ */}
      <div>
        <p>Selected Tags: {selectedTag}</p>
        <p>Selected SubTags: {selectedSubTags}</p>
      </div>
      {/* DEBUG ↑ */}
      <div className="flex flex-col gap-2 lg:items-center ">
        <Label className="text-h3 font-semibold">{t('articleFilter')}</Label>
        {subtext && <Text>{subtext}</Text>}
      </div>
      <div>
        <TagGroup
          selectionMode="single"
          selectedKeys={selectedTag}
          defaultSelectedKeys={defaultChip.id}
          onSelectionChange={setSelectedTag}
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
            {tags
              .map((tag) => {
                if (!tag.id || !tag.attributes?.title) {
                  return null
                }
                return (
                  <Chip
                    variant="large"
                    key={tag.id}
                    id={tag.id}
                    style={getCategoryColorLocalStyle({ color: tag.attributes.color })}
                  >
                    {tag.attributes.title}
                  </Chip>
                )
              })
              .filter(isDefined)}
          </TagList>
        </TagGroup>
        {Array.from(selectedTag)[0] != defaultChip.id && subTags?.length ? (
          <div className="flex flex-col pt-8 lg:items-center">
            <Label className="text-h5 pb-3 font-semibold">{t('subcategories')}</Label>
            <TagGroup
              selectionMode="multiple"
              selectedKeys={selectedSubTags}
              onSelectionChange={setSelectedSubTags}
            >
              <TagList className="flex flex-wrap gap-2 lg:justify-center">
                {subTags
                  .filter(isDefined)
                  .filter((subtag) => {
                    return subtag.attributes?.pageCategory?.data?.id === Array.from(selectedTag)[0]
                  })
                  .map((subtag) => {
                    if (!subtag.id || !subtag.attributes?.title) return null
                    return (
                      <Chip
                        variant="small"
                        style={getCategoryColorLocalStyle({
                          category:
                            colorCategoryMap[
                              (subtag.attributes.pageCategory?.data?.attributes?.color ??
                                'red') as Enum_Pagecategory_Color
                            ],
                        })}
                        key={subtag.id}
                        id={subtag.id}
                      >
                        {subtag.attributes.title}
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
