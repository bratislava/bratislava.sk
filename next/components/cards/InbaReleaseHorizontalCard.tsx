import { Typography } from '@bratislava/component-library'
import Image from 'next/image'
import React from 'react'

import { ChevronRightIcon } from '@/assets/ui-icons'
import CardBase, { CardBaseProps } from '@/components/cards/CardBase'
import CardContent from '@/components/cards/CardContent'
import ImagePlaceholder from '@/components/common/Image/ImagePlaceholder'
import MLink from '@/components/common/MLink/MLink'
import Markdown from '@/components/formatting/Markdown/Markdown'
import { useTranslation } from '@/utils/useTranslation'

type Props = {
  title: string
  linkHref: string
  imgSrc?: string
  imgSizes?: string
  date?: string
  tag?: string
  text?: string | null | undefined
} & CardBaseProps

const InbaReleaseHorizontalCard = ({
  imgSrc,
  imgSizes,
  date,
  tag,
  title,
  text,
  linkHref,
  ...rest
}: Props) => {
  const { t } = useTranslation('InbaRelease')

  return (
    <CardBase className="flex flex-row rounded-lg" {...rest}>
      <CardContent className="flex grow flex-row justify-between gap-4 lg:gap-8">
        <div className="w-[140px]">
          <div className="relative aspect-inba overflow-hidden rounded-lg">
            {imgSrc ? (
              <Image src={imgSrc} alt="" sizes={imgSizes} fill className="object-cover" />
            ) : (
              <ImagePlaceholder />
            )}
          </div>
        </div>
        <div className="flex grow flex-col gap-2">
          <MLink href={linkHref} stretched>
            <Typography type="h3" size="h5" className="line-clamp-3 group-hover:underline">
              {title}
            </Typography>
          </MLink>
          {text && (
            <div className="max-md:hidden">
              <Markdown variant="small" content={text} />
            </div>
          )}
          {date && (
            <Typography type="p" className="mt-1">
              {t('releasedOn', { date })}
            </Typography>
          )}
        </div>
        <div aria-hidden className="flex items-center max-md:hidden">
          <ChevronRightIcon />
        </div>
      </CardContent>
    </CardBase>
  )
}

export default InbaReleaseHorizontalCard
