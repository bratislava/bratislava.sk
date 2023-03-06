import { ComponentSectionsOrganizationalStructureFragment } from '@bratislava/strapi-sdk-homepage'
import React from 'react'

import { OrganizationalStructure } from '../../OrganizationalStructure/OrganizationalStructure'

type OrganizationalStructureSectionProps = {
  section: ComponentSectionsOrganizationalStructureFragment
}

const OrganizationalStructureSection = ({ section }: OrganizationalStructureSectionProps) => {
  return <OrganizationalStructure title={section.title} />
}

export default OrganizationalStructureSection
