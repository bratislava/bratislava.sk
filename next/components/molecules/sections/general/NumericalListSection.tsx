/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */
import NumericalListSectionUI from '@bratislava/ui-bratislava/NumericalListSectionUI/NumericalListSectionUI'
import React from 'react'

import { NumericalListSectionFragment } from '@/backend/graphql'
import { isPresent } from '@/utils/utils'

type NumericalListSectionProps = {
  section: NumericalListSectionFragment
}

const NumericalListSection = ({ section }: NumericalListSectionProps) => {
  return (
    <NumericalListSectionUI
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
