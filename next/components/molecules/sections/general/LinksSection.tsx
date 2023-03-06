import { LinksSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { Links } from '@bratislava/ui-bratislava'
import { parsePageLink } from '@utils/page'
import { isPresent } from '@utils/utils'
import React from 'react'

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
