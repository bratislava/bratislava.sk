import { Typography } from '@bratislava/component-library'
import Image from 'next/image'

import Markdown from '@/src/components/formatting/Markdown/Markdown'
import { UploadImageSrcEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

type IconTitleDescProps = {
  icon: UploadImageSrcEntityFragment | null | undefined
  title: string | null | undefined
  text: string | null | undefined
  disableIconBackground?: boolean | null | undefined
}

const IconTitleDescItem = ({
  icon,
  title,
  text,
  disableIconBackground = false,
}: IconTitleDescProps) => {
  const hasIconBackground = !disableIconBackground

  return (
    <li className="relative flex flex-col items-center gap-6">
      <div
        className={cn('flex shrink-0 items-center justify-center', {
          'rounded-full bg-category-200 p-6': hasIconBackground,
          'w-full': !hasIconBackground,
        })}
      >
        {icon?.attributes?.url && (
          <div
            className={cn('relative', {
              'h-18 w-18': hasIconBackground,
              'h-30 w-full': !hasIconBackground,
            })}
          >
            <Image src={icon.attributes.url} fill alt="" className="object-contain" />
          </div>
        )}
      </div>
      <div className="flex w-full flex-col gap-2 text-center">
        <Typography variant="h4" as="h3">
          {title}
        </Typography>
        <Markdown content={text} />
      </div>
    </li>
  )
}

export default IconTitleDescItem
