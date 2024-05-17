import React from 'react'

import OrganizationalStructure from '@/components/molecules/OrganizationalStructure/OrganizationalStructure'
import { OrganizationalStructureSectionFragment } from '@/services/graphql'

type OrganizationalStructureSectionProps = {
  section: OrganizationalStructureSectionFragment
}

const OrganizationalStructureSection = ({ section }: OrganizationalStructureSectionProps) => {
  return <OrganizationalStructure title={section.title} />
}

export default OrganizationalStructureSection
