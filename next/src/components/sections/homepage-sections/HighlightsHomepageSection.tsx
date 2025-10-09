import React from 'react'

import HomepageHighlightCard from '@/src/components/cards/HomepageHighlightCard'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

const HighlightsHomepageSection = () => {
  const { homepage } = useHomepageContext()
  const { highlights } = homepage ?? {}
  const { title, text, cards } = highlights ?? {}

  const filteredHighlights = cards?.filter(isDefined) ?? []

  return (
    <div className="flex flex-col py-8 lg:pt-18">
      <SectionHeader title={title} text={text} isCentered />

      <ResponsiveCarousel
        controlsVariant="side"
        mobile={1}
        tablet={2}
        desktop={2}
        items={filteredHighlights.map((highlight) => {
          const linkProps = getLinkProps(highlight)

          return (
            <HomepageHighlightCard
              key={highlight.id}
              variant="no-border"
              linkProps={linkProps}
              subtext={highlight.subtext ?? undefined}
              imgSrc={
                highlight.media?.url ??
                highlight.article?.coverMedia?.url ??
                highlight.page?.pageBackgroundImage?.url
              }
            />
          )
        })}
      />
    </div>
  )
}

export default HighlightsHomepageSection
