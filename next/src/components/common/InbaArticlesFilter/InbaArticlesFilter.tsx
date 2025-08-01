import React, { useEffect, useState } from 'react'
import { Label, Selection, TagGroup, TagList, Text } from 'react-aria-components'

import Chip from '@/src/components/common/Chip/Chip'
import { InbaTagEntityFragment } from '@/src/services/graphql'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

export type InbaArticlesFilterProps = {
  tags: InbaTagEntityFragment[]
  subtext?: string
  onChange: (tags: string[]) => void
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=10282-28799&mode=design&t=nfRPipuoNXasJ4TV-0
 */

const InbaArticlesFilter = ({ tags, subtext, onChange }: InbaArticlesFilterProps) => {
  const { t } = useTranslation()
  const [selectedTags, setSelectedTags] = useState<Selection>(new Set<string>())

  // FIXME TODO revisit and enable rules
  useEffect(() => {
    onChange(Array.from(selectedTags, (item) => item.toString()))
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedTags])

  return (
    <TagGroup
      selectionMode="multiple"
      selectedKeys={selectedTags}
      onSelectionChange={setSelectedTags}
      className="flex flex-col gap-6 lg:m-auto lg:w-[800px] lg:gap-10"
    >
      <div className="flex flex-col gap-2 lg:items-center">
        <Label className="text-h3 font-semibold">{t('InbaArticlesFilter.articleFilter')}</Label>
        {subtext && <Text>{subtext}</Text>}
      </div>
      <TagList className="flex flex-wrap gap-3 lg:justify-center">
        {tags
          .map((tag: InbaTagEntityFragment) => {
            return (
              <Chip
                variant="large"
                key={tag.documentId}
                id={tag.documentId}
                style={getCategoryColorLocalStyle({ category: 'main' })}
              >
                {tag.title}
              </Chip>
            )
          })
          .filter(isDefined)}
      </TagList>
    </TagGroup>
  )
}

export default InbaArticlesFilter
