import React from 'react'

import InBaCard from '@/src/components/cards/InBaCard'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { useTranslation } from '@/src/utils/useTranslation'

const InbaHomepageSection = () => {
  const { t } = useTranslation()

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
