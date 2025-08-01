import React from 'react'

import LinkCards from '@/src/components/common/LinkCards/LinkCards'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { LinkCardsSectionFragment } from '@/src/services/graphql'

type LinkCardsSectionProps = {
  section: LinkCardsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18052-16738&t=WYqf0QbVs3yYwwAP-4
 */

const LinkCardsSection = ({ section }: LinkCardsSectionProps) => {
  return (
    <SectionContainer className="py-6 lg:py-12">
      <LinkCards section={section} />
    </SectionContainer>
  )
}

export default LinkCardsSection
