import { Typography } from '@bratislava/component-library'
import React, { Fragment } from 'react'

import BlogPostCard from '@/components/cards/BlogPostCard'
import HomepageHorizontalCard from '@/components/cards/HomepageHorizontalCard'
import ResponsiveCarousel from '@/components/common/Carousel/ResponsiveCarousel'
import { useHomepageContext } from '@/components/providers/HomepageContextProvider'
import { getCommonLinkProps } from '@/utils/getCommonLinkProps'
import { isDefined } from '@/utils/isDefined'
import { useTranslation } from '@/utils/useTranslation'

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
          const { children: postTitle, ...linkProps } = getCommonLinkProps(highlight.link)

          return (
            <Fragment key={highlight.id}>
              <BlogPostCard
                className="lg:hidden"
                variant="shadow"
                title={postTitle ?? ''}
                linkProps={{
                  children: t('readMore'),
                  ...linkProps,
                }}
                imgSrc={highlight.image?.data?.attributes?.url}
              />
              <HomepageHorizontalCard
                className="max-lg:hidden"
                variant="shadow"
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
