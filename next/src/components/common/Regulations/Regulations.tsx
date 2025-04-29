import { Typography } from '@bratislava/component-library'
import { Fragment } from 'react'

import RegulationRowCard from '@/src/components/cards/RegulationRowCard'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import { RegulationEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  className?: string
  regulations?: RegulationEntityFragment[]
}

const Regulations = ({ className, regulations }: Props) => {
  const { t } = useTranslation()

  return (
    <div className={cn('flex flex-col gap-8', className)}>
      <Typography type="h2">{t('Regulation.relatedRegulations')}</Typography>
      {regulations?.length ? (
        <ul className="flex flex-col rounded-lg border-2 py-2">
          {regulations?.map((regulation, index) => {
            return regulation.attributes ? (
              <Fragment key={regulation.attributes.regNumber}>
                {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
                <li className="w-full">
                  <RegulationRowCard
                    title={`VZN ${regulation.attributes.regNumber} ${regulation.attributes.titleText ?? ''}`}
                    metadata={[
                      t('Regulation.numberOfAmendments', {
                        count: regulation.attributes.amendments?.data.length ?? 0,
                      }),
                    ]}
                    path={`/vzn/${regulation.attributes.slug}`}
                    className="px-4 lg:px-6"
                  />
                </li>
              </Fragment>
            ) : null
          })}
        </ul>
      ) : null}
    </div>
  )
}

export default Regulations
