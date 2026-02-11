import { Typography } from '@bratislava/component-library'
import React from 'react'

import { ChevronRightIcon } from '@/src/assets/icons'
import CardBase from '@/src/components/cards/CardBase'
import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import { isDefined } from '@/src/utils/isDefined'

export type JobOfferRowCardProps = {
  // TODO: add proper type with implementation of Nalboo api
  jobOffer: any
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18771-16152&t=7BaHype1nMgzyjER-4
 */

const JobOfferRowCard = ({ jobOffer }: JobOfferRowCardProps) => {
  const { title, titleLevel, location, salary, salaryInfo, url } = jobOffer

  return (
    <CardBase variant="no-border" className="group flex flex-row px-5 py-3 ring-inset">
      <div className="flex w-full flex-col gap-3">
        <Typography
          variant="h5"
          as={getCardTitleLevel(titleLevel)}
          className="group-hover:underline"
        >
          {title}
        </Typography>

        <div className="flex gap-2">
          <Typography variant="p-small">
            {[location, salary || salaryInfo].filter(isDefined).join(' • ')}
          </Typography>
        </div>
      </div>

      <Button
        href={url}
        aria-label={title}
        stretched
        icon={<ChevronRightIcon />}
        hasLinkIcon={false}
        className="self-center whitespace-nowrap"
      />
    </CardBase>
  )
}

export default JobOfferRowCard
