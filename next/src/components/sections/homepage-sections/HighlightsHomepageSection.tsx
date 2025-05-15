import { Typography } from '@bratislava/component-library'
import React, { Fragment } from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import HomepageHorizontalCard from '@/src/components/cards/HomepageHorizontalCard'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

const HighlightsHomepageSection = () => {
  const { t } = useTranslation()

  const { homepage } = useHomepageContext()
  const { highlights } = homepage?.attributes ?? {}
  const { title, text, cards } = highlights ?? {}

  const filteredHighlights = cards?.filter(isDefined) ?? []

  return (
    <div className="negative-x-spacing py-8 md:py-0">
      {title || text ? (
        <div className="flex flex-col gap-2 text-center lg:pt-18">
          {title && <Typography type="h2">{title}</Typography>}
          {text && <Typography type="p">{text}</Typography>}
        </div>
      ) : null}

      <ResponsiveCarousel
        controlsVariant="side"
        mobile={1}
        tablet={2}
        desktop={2}
        items={filteredHighlights.map((highlight) => {
          const { children: postTitle, ...linkProps } = getLinkProps(highlight.link)

          return (
            <Fragment key={highlight.id}>
              <ArticleCard
                className="lg:hidden"
                variant="no-border"
                title={postTitle ?? ''}
                linkProps={{
                  children: t('readMore'),
                  ...linkProps,
                }}
                imgSrc={highlight.image?.data?.attributes?.url}
              />
              <HomepageHorizontalCard
                className="max-lg:hidden"
                variant="no-border"
                title={postTitle ?? ''}
                linkProps={{
                  children: t('readMore'),
                  ...linkProps,
                }}
                imgSrc={highlight.image?.data?.attributes?.url}
              />
            </Fragment>
          )
        })}
      />
    </div>
  )
}

export default HighlightsHomepageSection
