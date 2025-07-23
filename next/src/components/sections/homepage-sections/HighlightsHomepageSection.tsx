import React, { Fragment } from 'react'

import ArticleCardOld from '@/src/components/cards/ArticleCardOld'
import HomepageHorizontalCard from '@/src/components/cards/HomepageHorizontalCard'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

const HighlightsHomepageSection = () => {
  const { t } = useTranslation()

  const { homepage } = useHomepageContext()
  const { highlights } = homepage ?? {}
  const { title, text, cards } = highlights ?? {}

  const filteredHighlights = cards?.filter(isDefined) ?? []

  return (
    <div className="negative-x-spacing py-8 lg:pt-18">
      <SectionHeader title={title} text={text} isCentered />

      <ResponsiveCarousel
        controlsVariant="side"
        mobile={1}
        tablet={2}
        desktop={2}
        items={filteredHighlights.map((highlight) => {
          const { children: postTitle, ...linkProps } = getLinkProps(highlight.link)

          return (
            <Fragment key={highlight.id}>
              <ArticleCardOld
                className="lg:hidden"
                title={postTitle}
                linkProps={{
                  children: t('readMore'),
                  ...linkProps,
                }}
                imgSrc={highlight.image.url}
              />
              <HomepageHorizontalCard
                className="max-lg:hidden"
                variant="no-border"
                title={postTitle ?? ''}
                linkProps={{
                  children: t('readMore'),
                  ...linkProps,
                }}
                imgSrc={highlight.image.url}
              />
            </Fragment>
          )
        })}
      />
    </div>
  )
}

export default HighlightsHomepageSection
