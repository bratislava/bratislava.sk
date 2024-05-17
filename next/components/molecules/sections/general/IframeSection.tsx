import React from 'react'

import { IframeSectionFragment } from '@/backend/graphql'
import Iframe from '@/components/ui/Iframe/Iframe'

type IframeSectionProps = { section: IframeSectionFragment }

const IframeSection = ({ section }: IframeSectionProps) => {
  return <Iframe {...section} />
}

export default IframeSection
