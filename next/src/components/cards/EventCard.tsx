import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React, { useId } from 'react'

import CardBase from '@/src/components/cards/CardBase'
import { CardTitleLevel } from '@/src/components/cards/getCardTitleLevel'
import Button from '@/src/components/common/Button/Button'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import { PageCardWithHeadersEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  eventPage: PageCardWithHeadersEntityFragment
  cardTitleLevel?: CardTitleLevel
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15643&t=TnBDoFjQ0SyGzgY6-4
 */

const EventCard = ({ eventPage, cardTitleLevel = 'h3' }: Props) => {
  const { t } = useTranslation()
  const titleId = useId()

  const imageSizes = generateImageSizes({ default: '100vw', md: '33vw' })

  const { title, pageBackgroundImage, pageHeaderSections } = eventPage

  // Pages have always max 1 header
  const [header] = pageHeaderSections ?? []
  const { date, address } = header?.__typename === 'ComponentHeaderSectionsEvent' ? header : {}

  const metadata = [formatDate(date), address]
    .filter((metadataItem) => !!metadataItem)
    .join('  •  ')

  return (
    <CardBase
      variant="border"
      className="bg-background-passive-base max-lg:rounded-none max-lg:border-0"
    >
      <div className="flex w-full flex-col lg:flex-row">
        <div className="relative aspect-384/216 overflow-hidden max-lg:rounded-lg lg:w-[384px]">
          {pageBackgroundImage?.url ? (
            <Image
              src={pageBackgroundImage.url}
              alt=""
              sizes={imageSizes}
              fill
              className="object-cover"
            />
          ) : (
            <ImagePlaceholder />
          )}
        </div>
        <div className="flex grow flex-col justify-between max-lg:gap-4 max-lg:pt-4 lg:px-8 lg:pt-8 lg:pb-6">
          <div className="flex flex-col gap-2 lg:gap-3">
            <Typography
              id={titleId}
              variant="h3"
              as={cardTitleLevel}
              className="group-hover:underline"
            >
              {title}
            </Typography>
            <Typography variant="p-small">{metadata}</Typography>
          </div>
          <Button
            stretched
            variant="link"
            href={getLinkProps({ page: eventPage }).href}
            aria-labelledby={titleId}
          >
            {t('common.showDetails')}
          </Button>
        </div>
      </div>
    </CardBase>
  )
}

export default EventCard
