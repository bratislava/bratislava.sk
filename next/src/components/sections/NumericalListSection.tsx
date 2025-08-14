/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */
import React from 'react'

import NumericalListItem from '@/src/components/common/NumericalList_Deprecated/NumericalListItem_Deprecated'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { NumericalListSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type NumericalListSectionProps = {
  section: NumericalListSectionFragment
}

const NumericalListSection = ({ section }: NumericalListSectionProps) => {
  const { title, text, items, variant } = section

  const filteredItems = items?.map((item) => item?.text).filter(isDefined) ?? []

  return (
    <SectionContainer>
      <div className="flex flex-col items-center justify-center gap-8 lg:gap-12">
        <SectionHeader title={title} text={text} isCentered />

        <div className="flex max-w-(--breakpoint-md) flex-col">
          {filteredItems.map((item, index) => (
            <NumericalListItem
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              index={index}
              text={item}
              variant={variant}
            />
          ))}
        </div>
      </div>
    </SectionContainer>
  )
}

export default NumericalListSection
