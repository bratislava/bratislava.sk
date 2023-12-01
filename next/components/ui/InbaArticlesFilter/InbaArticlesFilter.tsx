import { InbaTagEntityFragment } from '@backend/graphql'
import { BaTagGroup, ChipProps } from '@bratislava/component-library'
import Chip from '@components/forms/simple-components/Chip'
import { getCategoryColorLocalStyle } from '@utils/colors'
import { isDefined } from '@utils/isDefined'
import { useTranslations } from 'next-intl'
import React, { useEffect, useState } from 'react'
import { Label, Selection, Tag, TagGroup, TagList, Text } from 'react-aria-components'

export interface InbaArticlesFilterProps {
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
  const t = useTranslations('BlogPostsFilter')
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set<string>())
  const [selectedSubcategories, setSelectedSubcategories] = useState<Selection>(new Set<string>())

  useEffect(() => {
    onChange(Array.from(selectedTags, (item) => item.toString()))
  }, [selectedTags])

  const formattedTags = tags
    .map((tag: InbaTagEntityFragment) => {
      if (!tag.id || !tag.attributes) {
        return null
      }
      return {
        id: tag.id,
        key: tag.id,
        size: 'large',
        label: tag.attributes.title,
        color: 'red',
      }
    })
    .filter(isDefined)

  const formattedSubcategories =
    subCategories &&
    subCategories
      .map((subcategoryName) => {
        if (!subcategoryName) {
          return null
        }

        return {
          size: 'small',
          label: subcategoryName,
          color: 'red',
        }
      })
      .filter(isDefined)

  return (
    <div className="flex flex-col gap-6 py-18 lg:m-auto lg:w-[800px]  lg:gap-10 lg:py-18">
      <div className="flex flex-col gap-2 lg:items-center ">
        <Label className="text-h3 font-semibold">{t('articleFilter')}</Label>
        {subtext && <Text>{subtext}</Text>}
      </div>
      <div>
        <BaTagGroup
          setTags={setSelectedTags}
          selectedTags={selectedTags}
          selectionMode="multiple"
          tagListClassName="flex flex-row flex-wrap gap-3 lg:justify-center"
          tags={formattedTags as ChipProps[]}
        />

        {subCategories?.length ? (
          <div className="flex flex-col pt-8 lg:items-center">
            <Label className="text-h5 pb-3 font-semibold">{t('subcategories')}</Label>

            <BaTagGroup
              setTags={setSelectedSubcategories}
              selectedTags={selectedSubcategories}
              selectionMode="multiple"
              tagListClassName="flex flex-row flex-wrap gap-3 lg:justify-center"
              tags={formattedSubcategories as ChipProps[]}
            />
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
