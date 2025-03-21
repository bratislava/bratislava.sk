import React from 'react'

import Iframe from '@/src/components/common/Iframe/Iframe'
import { IframeSectionFragment } from '@/src/services/graphql'

type IframeSectionProps = { section: IframeSectionFragment }

const IframeSection = ({ section }: IframeSectionProps) => {
  return <Iframe {...section} />
}

export default IframeSection
