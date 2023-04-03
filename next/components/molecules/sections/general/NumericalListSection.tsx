/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */
import { NumericalListSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { NumericalListSectionUI } from '@bratislava/ui-bratislava/NumericalListSectionUI/NumericalListSectionUI'
import { isPresent } from '@utils/utils'
import React from 'react'

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
