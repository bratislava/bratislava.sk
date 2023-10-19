import { InbaTagEntityFragment } from '@backend/graphql'
import Chip from '@components/forms/simple-components/Chip'
import { isDefined } from '@utils/isDefined'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { Label, Selection, Tag, TagGroup, TagList, Text } from 'react-aria-components'

export interface InbaArticlesFilterProps {
  tags?: InbaTagEntityFragment[]
  subCategories?: string[]
  subtext?: string
  onChange: (tags: string[]) => void
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=10282-28799&mode=design&t=nfRPipuoNXasJ4TV-0
 */

const InbaArticlesFilter = ({
  tags,
  subCategories,
  subtext,
  onChange,
}: InbaArticlesFilterProps) => {
  const t = useTranslations('ArticleFilter')
  const [selectedFilters, setSelectedFilters] = useState<Selection>(new Set<string>())

  const updateArticleFilters = useEffect(() => {
    onChange(Array.from(selectedFilters, (item) => item.toString()))
  }, [selectedFilters])

  return (
    <div className="flex flex-col gap-6 py-18 lg:m-auto lg:w-[800px]  lg:gap-10 lg:py-18">
      <div className="flex flex-col gap-2 lg:items-center ">
        <Label className="text-h3 font-semibold">{t('articleFilter')}</Label>
        {subtext && <Text>{subtext}</Text>}
      </div>
      <div>
        <TagGroup
          selectionMode="multiple"
          selectedKeys={selectedFilters}
          onSelectionChange={setSelectedFilters}
        >
          <TagList className="flex flex-wrap gap-3 lg:justify-center">
            {tags?.filter(isDefined).map((tag) => (
              <Chip variant="large" key={tag.id} id={tag.id || ''}>
                {tag.attributes?.title}
              </Chip>
            ))}
          </TagList>
        </TagGroup>
        {subCategories?.length ? (
          <div className="flex flex-col pt-8 lg:items-center">
            <Label className="text-h5 pb-3 font-semibold">{t('subcategories')}</Label>
            <TagGroup selectionMode="multiple">
              <TagList className="flex flex-wrap gap-2 lg:justify-center">
                {subCategories.filter(isDefined).map((subcategoryName) => (
                  <Chip variant="small">{subcategoryName}</Chip>
                ))}
              </TagList>
            </TagGroup>
          </div>
        ) : null}
      </div>
    </div>
  )
}

export default InbaArticlesFilter
