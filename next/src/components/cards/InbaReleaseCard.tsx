import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React, { useId } from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import Button from '@/src/components/common/Button/Button'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  title: string
  linkHref: string
  imgSrc?: string
  imgSizes?: string
  date?: string
  tag?: string
  text?: string | null | undefined
} & CardBaseProps

const InbaReleaseCard = ({
  imgSrc,
  imgSizes,
  date,
  tag,
  title,
  text,
  linkHref,
  ...rest
}: Props) => {
  const { t } = useTranslation()
  const titleId = useId()

  return (
    <CardBase variant="no-border" className="rounded-none" {...rest}>
      <div className="flex grow flex-col justify-between gap-4 lg:gap-6">
        <div className="relative aspect-5/8 overflow-hidden rounded-lg border">
          {imgSrc ? (
            <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
          ) : (
            <ImagePlaceholder />
          )}
        </div>

        <div className="flex grow flex-col gap-2">
          <Typography
            id={titleId}
            variant="h5"
            as="h3"
            className="line-clamp-3 group-hover:underline"
          >
            {title}
          </Typography>
          {date ? <Typography variant="p-small">{date}</Typography> : null}
        </div>

        <Button variant="link" href={linkHref} stretched aria-labelledby={titleId}>
          {t('InbaRelease.releaseDetail')}
        </Button>
      </div>
    </CardBase>
  )
}

export default InbaReleaseCard
