import { Carousel as CarouselOld } from '@bratislava/ui-bratislava/Carousel/Carousel'
import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import HomepageHorizontalCard from '@components/molecules/presentation/HomepageHorizontalCard'
import Carousel from '@components/organisms/Carousel/Carousel'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { useHomepageContext } from '@utils/homepageContext'
import { isDefined } from '@utils/isDefined'
import { useTranslations } from 'next-intl'
import React from 'react'

// TODO: Old carousel works better on desktop, new one on mobile. We should unify them.

export const HighlightsHomepageSection = () => {
  const t = useTranslations()

  const { homepage } = useHomepageContext()
  const { highlights } = homepage?.attributes ?? {}
  const { title, text, cards } = highlights ?? {}

  const filteredHighlights = cards?.filter(isDefined) ?? []

  return (
    <div className="-mx-8 py-8 md:mx-0 md:py-0">
      {title || text ? (
        <div className="flex flex-col gap-2 text-center lg:pt-18">
          {title && <h2 className="text-h2">{title}</h2>}
          {text && <div>{text}</div>}
        </div>
      ) : null}
      <Carousel
        className="md:hidden"
        shiftIndex={1}
        visibleCount={1}
        listClassName="gap-4 px-8 py-8"
        itemClassName="w-[calc(100%-1rem)]"
        hideControls
        items={filteredHighlights.map((post, index) => {
          const { children: postTitle, ...linkProps } = getCommonLinkProps(post.link)

          return {
            key: `${index}`,
            element: (
              <BlogPostCard
                variant="shadow"
                title={postTitle ?? ''}
                linkProps={{
                  children: t('readMore'),
                  ...linkProps,
                }}
                imgSrc={post.image?.data?.attributes?.url}
              />
            ),
          }
        })}
      />
      <CarouselOld
        className="hidden md:flex"
        shiftIndex={1}
        visibleItems={2}
        scrollerClassName=""
        items={filteredHighlights.map((post, index) => {
          const { children: postTitle, ...linkProps } = getCommonLinkProps(post.link)

          return (
            <div className="py-8">
              <HomepageHorizontalCard
                // eslint-disable-next-line react/no-array-index-key
                key={index}
                variant="shadow"
                title={postTitle ?? ''}
                linkProps={{
                  children: t('readMore'),
                  ...linkProps,
                }}
                imgSrc={post.image?.data?.attributes?.url}
              />
            </div>
          )
        })}
      />
    </div>
  )
}

export default HighlightsHomepageSection
