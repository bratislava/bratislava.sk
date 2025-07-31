import React from 'react'

import Iframe from '@/src/components/common/Iframe/Iframe'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { IframeSectionFragment } from '@/src/services/graphql'

type IframeSectionProps = { section: IframeSectionFragment }

const IframeSection = ({ section }: IframeSectionProps) => {
  return (
    <SectionContainer>
      <Iframe {...section} titleLevel={section.titleLevelIframeSection} />
    </SectionContainer>
  )
}

export default IframeSection
