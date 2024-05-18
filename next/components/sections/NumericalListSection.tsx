/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */
import React from 'react'

import NumericalList from '@/components/common/NumericalList_Deprecated/NumericalList_Deprecated'
import { NumericalListSectionFragment } from '@/services/graphql'
import { isPresent } from '@/utils/utils'

type NumericalListSectionProps = {
  section: NumericalListSectionFragment
}

const NumericalListSection = ({ section }: NumericalListSectionProps) => {
  return (
    <NumericalList
      title={section.title}
      items={section.items?.filter(isPresent)}
      buttonText={section.buttonText}
      buttonLink={section.buttonLink}
      variant={section.variant ?? undefined}
      hasBackground={section.hasBackground}
    />
  )
}

export default NumericalListSection
