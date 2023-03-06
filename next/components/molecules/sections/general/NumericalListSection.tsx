/* eslint-disable @typescript-eslint/no-unnecessary-type-assertion,@typescript-eslint/no-non-null-assertion */
import { ComponentSectionsNumericalListFragment } from '@bratislava/strapi-sdk-homepage'
import { NumericalListSectionUI } from '@bratislava/ui-bratislava/NumericalListSectionUI/NumericalListSectionUI'
import { isPresent } from '@utils/utils'
import React from 'react'

type NumericalListSectionProps = {
  section: ComponentSectionsNumericalListFragment
}

const NumericalListSection = ({ section }: NumericalListSectionProps) => {
  // TODO: Fix.
  // The UI component doesn't expect Strapi version (with undefined/null).
  if (
    !isPresent(section.title) ||
    !isPresent(section.items) ||
    !isPresent(section.buttonLink) ||
    !isPresent(section.buttonText) ||
    !isPresent(section.variant) ||
    !isPresent(section.hasBackground)
  ) {
    return null
  }

  return (
    <NumericalListSectionUI
      title={section.title}
      items={section.items.filter(isPresent)}
      buttonText={section.buttonText}
      buttonLink={section.buttonLink}
      variant={section.variant}
      hasBackground={section.hasBackground}
    />
  )
}

export default NumericalListSection
