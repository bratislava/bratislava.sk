import BlogPostCard from '@components/molecules/presentation/BlogPostCard'
import HomepageHorizontalCard from '@components/molecules/presentation/HomepageHorizontalCard'
import Carousel from '@components/organisms/Carousel/Carousel'
import { useHomepageContext } from '@utils/homepageContext'
import { isDefined } from '@utils/isDefined'
import { isExternalLink } from '@utils/isExternalLink'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Carousel as CarouselOld } from '../../Carousel/Carousel'

// TODO: Old carousel works better on desktop, new one on mobile. We should unify them.

export const HighlightsHomepageSection = () => {
  const t = useTranslations()

  const { homepage } = useHomepageContext()
  const { highlights } = homepage?.attributes ?? {}
  const { title, text } = highlights ?? {}

  // TODO replace by highlights.cards
  const posts = homepage?.attributes?.posts?.filter(isDefined) ?? []

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
        items={posts.map((post, index) => ({
          key: `${index}`,
          element: (
            <BlogPostCard
              variant="shadow"
              title={post.title ?? ''}
              linkProps={{
                children: t('readMore'),
                href: post.slug ?? '#',
                target: post.slug && isExternalLink(post.slug) ? '_blank' : undefined,
              }}
              imgSrc={post.image?.data?.attributes?.url}
            />
          ),
        }))}
      />
      <CarouselOld
        className="hidden md:flex"
        shiftIndex={1}
        visibleItems={2}
        scrollerClassName=""
        items={posts.map((post, index) => (
          <div className="py-8">
            <HomepageHorizontalCard
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              variant="shadow"
              title={post.title ?? ''}
              linkProps={{
                children: t('readMore'),
                href: post.slug ?? '#',
                target: post.slug && isExternalLink(post.slug) ? '_blank' : undefined,
              }}
              imgSrc={post.image?.data?.attributes?.url}
            />
          </div>
        ))}
      />
    </div>
  )
}

export default HighlightsHomepageSection
