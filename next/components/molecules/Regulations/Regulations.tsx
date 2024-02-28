import { RegulationEntityFragment } from '@backend/graphql'
import { Typography } from '@bratislava/component-library'
import RegulationCard from '@components/molecules/Regulations/RegulationCard'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import { useLocale, useTranslations } from 'next-intl'

export interface Props {
  className?: string
  regulations?: RegulationEntityFragment[]
}

export const Regulations = ({ className, regulations }: Props) => {
  const t = useTranslations()
  const locale = useLocale()

  return (
    <div className={className}>
      <Typography type="h2">{t('Regulation.relatedRegulations')}</Typography>
      {regulations?.length ? (
        <>
          <div className="mt-6 hidden grid-cols-3 gap-8 lg:grid">
            {regulations?.map((regulation) => {
              const path =
                locale === 'en'
                  ? `/en/vzn/${regulation.attributes?.slug}`
                  : `/vzn/${regulation.attributes?.slug}`
              return (
                <div className="w-full">
                  {/* TODO: consider adding english translation GBR instead of VZN  */}
                  <RegulationCard
                    title={`VZN ${regulation.attributes?.regNumber ?? ''}`}
                    key={regulation.attributes?.regNumber}
                    isUplneZnenie={false}
                    path={path}
                  />
                </div>
              )
            })}
          </div>
          <div className="block lg:hidden">
            <ResponsiveCarousel
              items={regulations?.map((regulation) => (
                // TODO: consider adding english translation GBR instead of VZN
                <RegulationCard
                  title={`VZN ${regulation.attributes?.regNumber ?? ''}`}
                  key={regulation.attributes?.regNumber}
                  isUplneZnenie={false}
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
