import React from 'react'

import Links from '@/src/components/common/Links/Links'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { LinksSectionFragment } from '@/src/services/graphql'

type LinksSectionProps = {
  section: LinksSectionFragment
}

const LinksSection = ({ section }: LinksSectionProps) => {
  return (
    <SectionContainer>
      <Links title={section.title} pageLinks={section.pageLinks} />
    </SectionContainer>
  )
}

export default LinksSection
