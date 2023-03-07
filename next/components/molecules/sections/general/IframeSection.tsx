import { IframeSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { Iframe } from '@bratislava/ui-bratislava'
import React from 'react'

type IframeSectionProps = { section: IframeSectionFragment }

const IframeSection = ({ section }: IframeSectionProps) => {
  return <Iframe {...section} />
}

export default IframeSection
