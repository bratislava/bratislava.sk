import { InBaCard } from '@components/ui/InBaCard/InBaCard'
import { SectionContainer } from '@components/ui/SectionContainer/SectionContainer'
import { useHomepageContext } from '@utils/homepageContext'
import { useTranslations } from 'next-intl'
import React from 'react'

const InbaHomepageSection = () => {
  const t = useTranslations()

  const { homepage } = useHomepageContext()

  const frontImageUrl = homepage?.attributes?.inbaFrontImage?.data?.attributes?.url
  const rearImageUrl = homepage?.attributes?.inbaRearImage?.data?.attributes?.url

  return (
    <SectionContainer className="mb-8">
      <InBaCard
        className="mx-auto mt-40 min-h-[200px] max-w-3xl md:mt-28"
        title={homepage?.attributes?.inba?.title}
        content={homepage?.attributes?.inba?.content}
        linkProps={{
          children: t('readMore'),
          href: homepage?.attributes?.inbaUrl ?? '#',
          target: '_blank',
        }}
        frontImageUrl={frontImageUrl}
        rearImageUrl={rearImageUrl}
      />
      <div aria-hidden className="hidden md:block md:h-20" />
    </SectionContainer>
  )
}

export default InbaHomepageSection
