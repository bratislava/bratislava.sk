import React from 'react'

import OrganizationalStructure from '@/src/components/common/OrganizationalStructure_Deprecated/OrganizationalStructure_Deprecated'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { OrganizationalStructureSectionFragment } from '@/src/services/graphql'

type OrganizationalStructureSectionProps = {
  section: OrganizationalStructureSectionFragment
}

const OrganizationalStructureSection = ({ section }: OrganizationalStructureSectionProps) => {
  return (
    <SectionContainer>
      <OrganizationalStructure title={section.title} />
    </SectionContainer>
  )
}

export default OrganizationalStructureSection
