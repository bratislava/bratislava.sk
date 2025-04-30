import { Typography } from '@bratislava/component-library'
import { Fragment } from 'react'

import RegulationRowCard from '@/src/components/cards/RegulationRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import { RegulationEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getRegulationMetadata } from '@/src/utils/getRegulationMetadata'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'
import { isProductionDeployment } from '@/src/utils/utils'

type Props = {
  className?: string
  regulations?: RegulationEntityFragment[]
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-9451&m=dev
 */

const Regulations = ({ className, regulations }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <Typography type="h2">{t('Regulation.relatedRegulations')}</Typography>
      {regulations?.length ? (
        <ul className="flex flex-col rounded-lg border-2 py-2">
          {regulations?.map((regulation, index) => {
            if (!regulation.attributes) {
              return null
            }

            const { effectiveUntil } = getRegulationMetadata(regulation.attributes)

            const numberOfAmendments = regulation.attributes.amendments?.data.length
            const numberOfAmendmentsMessage = numberOfAmendments
              ? t('Regulation.numberOfAmendments', { count: numberOfAmendments })
              : null

            return (
              <Fragment key={regulation.attributes.regNumber}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li className="w-full">
                  {/* TODO we show more details on staging for testing and cleanup purposes */}
                  {/* TODO rewrite to one component when we know what details we want to show  */}
                  {isProductionDeployment() ? (
                    <RegulationRowCard
                      title={`VZN ${regulation.attributes.regNumber} ${regulation.attributes.titleText ?? ''}`}
                      metadata={[numberOfAmendmentsMessage].filter(isDefined)}
                      isFullTextRegulation={regulation.attributes.isFullTextRegulation}
                      // isAmendee={!!regulation.attributes.amending?.data?.length}
                      // isCancelled={!!effectiveUntil}
                      path={`/vzn/${regulation.attributes.slug}`}
                      className="px-4 lg:px-6"
                    />
                  ) : (
                    <RegulationRowCard
                      title={`VZN ${regulation.attributes.regNumber} ${regulation.attributes.titleText ?? ''}`}
                      metadata={[numberOfAmendmentsMessage].filter(isDefined)}
                      isFullTextRegulation={regulation.attributes.isFullTextRegulation}
                      isAmendee={!!regulation.attributes.amending?.data?.length}
                      isCancelled={!!effectiveUntil}
                      path={`/vzn/${regulation.attributes.slug}`}
                      className="px-4 lg:px-6"
                    />
                  )}
                </li>
              </Fragment>
            )
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default Regulations
