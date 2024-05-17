import Iframe from '@bratislava/ui-bratislava/Iframe/Iframe'
import React from 'react'

import { IframeSectionFragment } from '@/backend/graphql'

type IframeSectionProps = { section: IframeSectionFragment }

const IframeSection = ({ section }: IframeSectionProps) => {
  return <Iframe {...section} />
}

export default IframeSection
