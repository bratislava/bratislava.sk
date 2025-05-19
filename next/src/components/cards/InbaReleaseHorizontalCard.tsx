import { Typography } from '@bratislava/component-library'
import Image from 'next/image'

import { ChevronRightIcon } from '@/src/assets/ui-icons'
import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardContent from '@/src/components/cards/CardContent'
import ImagePlaceholder from '@/src/components/common/Image/ImagePlaceholder'
import MLink from '@/src/components/common/MLink/MLink'
import Markdown from '@/src/components/formatting/Markdown/Markdown'
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
  const { t } = useTranslation()

  return (
    <CardBase className="flex flex-row rounded-lg" {...rest}>
      <CardContent className="flex grow flex-row justify-between gap-4 lg:gap-8">
        <div className="w-[140px]">
          <div className="relative aspect-[1/1.4] overflow-hidden rounded-lg">
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
              {t('InbaRelease.releasedOn', { date })}
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
