import { Typography } from '@bratislava/component-library'
import React from 'react'

import CardBase from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { JobOfferListSectionFragment } from '@/src/services/graphql'

type JobOffersSectionProps = { section: JobOfferListSectionFragment }

const JobOffersSection = ({ section }: JobOffersSectionProps) => {
  const { title, text, titleLevel = 'h2' } = section

  return (
    <SectionContainer>
      <SectionHeader title={title} text={text} />
      <CardBase title="test">
        <CardContent className="grow justify-between p-6">
          {/* <Typography variant="h4" as={titleLevel} className="group-hover:underline">
            {title}
          </Typography> */}
          <Typography variant="p-small">Lorem ipsum</Typography>
        </CardContent>
      </CardBase>
    </SectionContainer>
  )
}

export default JobOffersSection
