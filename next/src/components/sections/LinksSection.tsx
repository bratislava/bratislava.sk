import React from 'react'

import Links from '@/src/components/common/Links/Links'
import { LinksSectionFragment } from '@/src/services/graphql'
import { parsePageLink } from '@/src/utils/pageUtils_Deprecated'
import { isPresent } from '@/src/utils/utils'

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
