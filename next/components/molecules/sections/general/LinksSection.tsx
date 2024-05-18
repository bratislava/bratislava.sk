import React from 'react'

import Links from '@/components/ui/Links/Links'
import { LinksSectionFragment } from '@/services/graphql'
import { parsePageLink } from '@/utils/pageUtils_Deprecated'
import { isPresent } from '@/utils/utils'

type LinksSectionProps = {
  section: LinksSectionFragment
}

const LinksSection = ({ section }: LinksSectionProps) => {
  return (
    <Links
      title={section.title ?? ''}
      pageLinks={
        section.pageLinks?.map((pageLink) => parsePageLink(pageLink)).filter(isPresent) ?? []
      }
    />
  )
}

export default LinksSection
