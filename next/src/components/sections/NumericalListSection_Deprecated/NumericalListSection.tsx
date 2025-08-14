import React from 'react'

import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import NumericalListItem from '@/src/components/sections/NumericalListSection_Deprecated/NumericalListItem_Deprecated'
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
      <div className="flex flex-col items-center justify-center gap-8 lg:gap-10">
        <SectionHeader title={title} text={text} isCentered />

        <ol className="flex max-w-(--breakpoint-md) flex-col">
          {filteredItems.map((item, index) => (
            // eslint-disable-next-line react/no-array-index-key
            <li key={index}>
              <NumericalListItem index={index} text={item} variant={variant} />
            </li>
          ))}
        </ol>
      </div>
    </SectionContainer>
  )
}

export default NumericalListSection
