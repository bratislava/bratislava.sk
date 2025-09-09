import { Typography } from '@bratislava/component-library'
import React from 'react'

import { getCardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import AlertMessage from '@/src/components/common/AlertMessage/AlertMessage'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { OpeningHoursSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

type OpeningHoursSectionProps = {
  section: OpeningHoursSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=18680-15304&t=6ADekEKBzcjqecZw-4
 */

const OpeningHoursSection = ({ section }: OpeningHoursSectionProps) => {
  const { t } = useTranslation()

  const {
    title,
    text,
    alertMessage,
    openingHoursItems,
    titleLevelOpeningHoursSection: titleLevel,
  } = section

  const filteredOpeningHoursItems = openingHoursItems?.filter(isDefined) ?? []

  return (
    <SectionContainer>
      <div className="flex max-w-200 flex-col gap-4 lg:gap-6">
        <div className="flex flex-col gap-4">
          <SectionHeader title={title} text={text} titleLevel={titleLevel} />
          {alertMessage ? (
            <AlertMessage
              title={t('OpeningHoursSection.banner.title')}
              titleLevel={getCardTitleLevel(titleLevel)}
              text={alertMessage.text}
            />
          ) : null}
        </div>
        <div className="flex flex-col divide-y divide-border-passive-primary rounded-lg border border-border-passive-primary px-4 py-2 text-content-passive-secondary lg:px-6">
          {filteredOpeningHoursItems.map((item, index) => {
            return (
              // eslint-disable-next-line react/no-array-index-key
              <div key={index} className="flex flex-wrap justify-between gap-1 py-3.5 lg:py-4">
                <Typography variant="p-small" className="font-semibold">
                  {item.label}
                </Typography>
                <Typography variant="p-small">{item.value}</Typography>
              </div>
            )
          })}
        </div>
      </div>
    </SectionContainer>
  )
}

export default OpeningHoursSection
