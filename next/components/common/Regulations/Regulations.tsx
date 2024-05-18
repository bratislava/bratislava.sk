import { Typography } from '@bratislava/component-library'
import { useTranslations } from 'next-intl'

import RegulationCard from '@/components/cards/RegulationCard/RegulationCard'
import ResponsiveCarousel from '@/components/common/Carousel/ResponsiveCarousel'
import { RegulationEntityFragment } from '@/services/graphql'

type Props = {
  className?: string
  regulations?: RegulationEntityFragment[]
}

const Regulations = ({ className, regulations }: Props) => {
  const t = useTranslations()

  return (
    <div className={className}>
      <Typography type="h2">{t('Regulation.relatedRegulations')}</Typography>
      {regulations?.length ? (
        <>
          <div className="mt-6 hidden grid-cols-3 gap-8 lg:grid">
            {regulations?.map((regulation) => {
              return (
                <div className="w-full">
                  <RegulationCard
                    title={`VZN ${regulation.attributes?.regNumber ?? ''}`}
                    key={regulation.attributes?.regNumber}
                    metadata={t('Regulation.numberOfAmendments', {
                      count: regulation.attributes?.amendments?.data.length ?? 0,
                    })}
                    path={`/vzn/${regulation.attributes?.slug}`}
                  />
                </div>
              )
            })}
          </div>
          <div className="lg:hidden">
            <ResponsiveCarousel
              items={regulations?.map((regulation) => (
                <RegulationCard
                  title={`VZN ${regulation.attributes?.regNumber ?? ''}`}
                  key={regulation.attributes?.regNumber}
                  metadata={t('Regulation.numberOfAmendments', {
                    count: regulation.attributes?.amendments?.data.length ?? 0,
                  })}
                  path={`/vzn/${regulation.attributes?.slug ?? ''}`}
                />
              ))}
            />
          </div>
        </>
      ) : null}
    </div>
  )
}

export default Regulations
