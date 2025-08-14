/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */
import React from 'react'

import NumericalList from '@/src/components/common/NumericalList_Deprecated/NumericalList_Deprecated'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { NumericalListSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type NumericalListSectionProps = {
  section: NumericalListSectionFragment
}

const NumericalListSection = ({ section }: NumericalListSectionProps) => {
  return (
    <SectionContainer>
      <NumericalList
        title={section.title}
        text={section.text}
        items={section.items?.map((item) => item?.text).filter(isDefined)}
        variant={section.variant ?? undefined}
      />
    </SectionContainer>
  )
}

export default NumericalListSection
