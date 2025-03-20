import React from 'react'

import Iframe from '@/components/common/Iframe/Iframe'
import { IframeSectionFragment } from '@/services/graphql'

type IframeSectionProps = { section: IframeSectionFragment }

const IframeSection = ({ section }: IframeSectionProps) => {
  return <Iframe {...section} />
}

export default IframeSection
