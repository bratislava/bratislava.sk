import React from 'react'

import Iframe from '@/components/ui/Iframe/Iframe'
import { IframeSectionFragment } from '@/services/graphql'

type IframeSectionProps = { section: IframeSectionFragment }

const IframeSection = ({ section }: IframeSectionProps) => {
  return <Iframe {...section} />
}

export default IframeSection
