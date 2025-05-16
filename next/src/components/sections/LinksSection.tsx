import React from 'react'

import Links from '@/src/components/common/Links/Links'
import { LinksSectionFragment } from '@/src/services/graphql'

type LinksSectionProps = {
  section: LinksSectionFragment
}

const LinksSection = ({ section }: LinksSectionProps) => {
  return <Links title={section.title} pageLinks={section.pageLinks} />
}

export default LinksSection
