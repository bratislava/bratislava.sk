import React from 'react'

import { LinksSectionFragment } from '@/backend/graphql'
import Links from '@/components/ui/Links/Links'
import { parsePageLink } from '@/utils/page'
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
