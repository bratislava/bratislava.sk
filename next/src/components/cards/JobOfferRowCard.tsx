import { Typography } from '@bratislava/component-library'
import React from 'react'

import { ChevronRightIcon } from '@/src/assets/icons'
import CardBase from '@/src/components/cards/CardBase'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import MLink from '@/src/components/common/MLink/MLink'
import { Enum_Componentsectionsjoboffers_Titlelevel } from '@/src/services/graphql'
import { NalgooJobOffersResponse } from '@/src/services/nalgoo/nalgooJobOffers.fetcher'
import { isDefined } from '@/src/utils/isDefined'

export type JobOfferRowCardProps = {
  jobOffer: NalgooJobOffersResponse
  titleLevel?: Enum_Componentsectionsjoboffers_Titlelevel | null | undefined
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18771-16152&t=7BaHype1nMgzyjER-4
 */

const JobOfferRowCard = ({ jobOffer, titleLevel }: JobOfferRowCardProps) => {
  const { title, location, salary, salaryInfo, url } = jobOffer

  // url can be null according to Nalboo API
  if (!url) console.error(`Missing URL to job offer - ${title}`)

  const employmentForms = jobOffer.employmentForms.map((item) => item.name).join('/')

  return (
    <CardBase variant="no-border" className="group p-4 ring-inset lg:px-6">
      <MLink
        href={url ?? '/mesto-bratislava/sprava-mesta/magistrat/pracovne-prilezitosti'}
        className="flex"
      >
        <div className="flex w-full flex-col gap-3">
          <Typography
            variant="h6"
            as={getCardTitleLevel(titleLevel)}
            className="group-hover:underline"
          >
            {title}
          </Typography>
          <Typography variant="p-tiny">
            {[location, employmentForms, salary, salaryInfo].filter(isDefined).join(' • ')}
          </Typography>
        </div>
        <ChevronRightIcon className="self-center whitespace-nowrap max-lg:invisible" />
      </MLink>
    </CardBase>
  )
}

export default JobOfferRowCard
