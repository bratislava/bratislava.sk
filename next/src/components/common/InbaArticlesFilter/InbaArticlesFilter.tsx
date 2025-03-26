import React, { useEffect, useState } from 'react'
import { Label, Selection, TagGroup, TagList, Text } from 'react-aria-components'

import Chip from '@/src/components/common/Chip/Chip'
import { InbaTagEntityFragment } from '@/src/services/graphql'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

export type InbaArticlesFilterProps = {
  tags: InbaTagEntityFragment[]
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
  const { t } = useTranslation()
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set<string>())

  useEffect(() => {
    onChange(Array.from(selectedTags, (item) => item.toString()))
  }, [onChange, selectedTags])

  return (
    <div className="flex flex-col gap-6 py-18 lg:m-auto lg:w-[800px]  lg:gap-10 lg:py-18">
      <div className="flex flex-col gap-2 lg:items-center ">
        <Label className="text-h3 font-semibold">{t('BlogPostsFilter.articleFilter')}</Label>
        {subtext && <Text>{subtext}</Text>}
      </div>
      <div>
        <TagGroup
          selectionMode="multiple"
          selectedKeys={selectedTags}
          onSelectionChange={setSelectedTags}
        >
          <TagList className="flex flex-wrap gap-3 lg:justify-center">
            {tags
              .map((tag: InbaTagEntityFragment) => {
                if (!tag.id || !tag.attributes) {
                  return null
                }

                return (
                  <Chip
                    variant="large"
                    key={tag.id}
                    id={tag.id}
                    style={getCategoryColorLocalStyle({ category: 'main' })}
                  >
                    {tag.attributes.title}
                  </Chip>
                )
              })
              .filter(isDefined)}
          </TagList>
        </TagGroup>
        {subCategories?.length ? (
          <div className="flex flex-col pt-8 lg:items-center">
            <Label className="text-h5 pb-3 font-semibold">
              {t('BlogPostsFilter.subcategories')}
            </Label>
            <TagGroup selectionMode="multiple">
              <TagList className="flex flex-wrap gap-2 lg:justify-center">
                {subCategories.filter(isDefined).map((subcategoryName) => (
                  <Chip variant="small" style={getCategoryColorLocalStyle({ category: 'main' })}>
                    {subcategoryName}{' '}
                  </Chip>
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
