import { Typography } from '@bratislava/component-library'
import React from 'react'

import { ChevronRightIcon } from '@/src/assets/icons'
import CardBase from '@/src/components/cards/CardBase'
import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import MLink from '@/src/components/common/MLink/MLink'
import { NalgooJobOffersResponse } from '@/src/services/nalgoo/nalgooJobOffers.fetcher'
import { isDefined } from '@/src/utils/isDefined'

export type JobOfferRowCardProps = {
  jobOffer: NalgooJobOffersResponse
  cardTitleLevel?: CardTitleLevel
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18771-18707&t=5E79HiatNV1yaVVk-0
 */

const JobOfferRowCard = ({ jobOffer, cardTitleLevel = 'h3' }: JobOfferRowCardProps) => {
  const { title, location, salary, salaryInfo, url } = jobOffer

  // url can be null according to Nalgoo API
  if (!url) console.error(`Missing URL to job offer - ${title}`)

  const employmentForms = jobOffer.employmentForms.map((item) => item.name).join('/')

  return (
    <CardBase variant="no-border" className="group p-4 ring-inset lg:px-6">
      <div className="flex gap-4">
        <div className="flex w-full flex-col gap-1">
          <MLink
            href={url ?? '/mesto-bratislava/sprava-mesta/magistrat/pracovne-prilezitosti'}
            stretched
          >
            <Typography variant="h6" as={cardTitleLevel} className="group-hover:underline">
              {title}
            </Typography>
          </MLink>
          <Typography variant="p-tiny">
            {[location, employmentForms, salary, salaryInfo].filter(isDefined).join(' • ')}
          </Typography>
        </div>
        <ChevronRightIcon className="self-center max-lg:hidden" />
      </div>
    </CardBase>
  )
}

export default JobOfferRowCard
