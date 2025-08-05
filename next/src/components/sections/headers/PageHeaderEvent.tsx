import { Typography } from '@bratislava/component-library'
import React from 'react'

import Button from '@/src/components/common/Button/Button'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import PageHeader, { PageHeaderProps } from '@/src/components/common/PageHeader/PageHeader'
import { EventPageHeaderSectionFragment, PageEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useLocale } from '@/src/utils/useLocale'

type Props = Pick<PageHeaderProps, 'title' | 'breadcrumbs' | 'headerLinks'> & {
  image: PageEntityFragment['pageBackgroundImage']
  header: EventPageHeaderSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15690&m=dev
 */

const PageHeaderEvent = ({ title, breadcrumbs, headerLinks, image, header }: Props) => {
  const { date, address } = header
  const locale = useLocale()

  const parsedDate = date
    ? new Date(date).toLocaleDateString(locale === 'en' ? 'en-US' : 'sk-SK', {
        month: 'long',
        day: 'numeric',
      })
    : ''

  const [day, month] =
    locale === 'en'
      ? parsedDate.split(' ').toReversed() // December 15 -> [15, December]
      : parsedDate.split('. ') // 15. december -> [15, december]

  return (
    <PageHeader breadcrumbs={breadcrumbs}>
      <div className="flex w-full flex-col overflow-hidden rounded-2xl bg-background-passive-base lg:flex-row">
        <div className="flex flex-col justify-between gap-6 p-4 lg:w-[26rem] lg:gap-40 lg:p-6">
          <div className="flex flex-col gap-6 lg:gap-8">
            {/* Date display - Screen: mobile */}
            <div className="lg:hidden">
              <Typography variant="p-default">{formatDate(date)}</Typography>
            </div>
            {/* Date display - Screen: desktop */}
            <div className="max-lg:hidden">
              <div className="flex size-20 flex-col items-center justify-center rounded-lg bg-background-passive-inverted-base text-content-passive-inverted-primary">
                <Typography variant="h3" as="p">
                  {day}
                </Typography>
                <Typography variant="p-small">{month}</Typography>
              </div>
            </div>
            <div className="flex flex-col gap-2 lg:gap-4">
              <Typography variant="h1">{title}</Typography>
              <Typography variant="p-default">{address}</Typography>
            </div>
          </div>
          {headerLinks?.length ? (
            <div className="flex flex-col gap-2 lg:gap-3">
              {headerLinks.map((button, index) => (
                <Button
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  variant={index === 0 ? 'solid' : 'outline'}
                  fullWidth
                  {...getLinkProps(button)}
                />
              ))}
            </div>
          ) : null}
        </div>
        <div className="relative grow max-lg:aspect-288/162">
          {image ? (
            <StrapiImage
              image={image}
              fill
              alt=""
              sizes={generateImageSizes({ default: '100vw', lg: '75vw' })}
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
      </div>
    </PageHeader>
  )
}

export default PageHeaderEvent
