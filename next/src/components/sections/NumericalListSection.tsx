/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */
import React from 'react'

import NumericalList from '@/src/components/common/NumericalList_Deprecated/NumericalList_Deprecated'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { NumericalListSectionFragment } from '@/src/services/graphql'
import { isPresent } from '@/src/utils/utils'

type NumericalListSectionProps = {
  section: NumericalListSectionFragment
}

const NumericalListSection = ({ section }: NumericalListSectionProps) => {
  return (
    <SectionContainer>
      <NumericalList
        title={section.title}
        items={section.items?.filter(isPresent)}
        buttonText={section.buttonText}
        buttonLink={section.buttonLink}
        variant={section.variant ?? undefined}
      />
    </SectionContainer>
  )
}

export default NumericalListSection
