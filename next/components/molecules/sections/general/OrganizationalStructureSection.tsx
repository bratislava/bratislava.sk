import React from 'react'

import { OrganizationalStructureSectionFragment } from '@/backend/graphql'

import OrganizationalStructure from '../../OrganizationalStructure/OrganizationalStructure'

type OrganizationalStructureSectionProps = {
  section: OrganizationalStructureSectionFragment
}

const OrganizationalStructureSection = ({ section }: OrganizationalStructureSectionProps) => {
  return <OrganizationalStructure title={section.title} />
}

export default OrganizationalStructureSection
