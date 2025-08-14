import { Typography } from '@bratislava/component-library'
import React from 'react'
import Markdown from 'react-markdown'

import StrapiImage from '@/src/components/common/Image/StrapiImage'
import { ColumnsSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

type ColumnsSectionItemProps = ColumnsSectionFragment['columns'][0] & {
  imageVariant?: ColumnsSectionFragment['imageVariant']
  imageSizes?: string
  className?: string
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=5865-15902&m=dev
 */

const ColumnsSectionItem = ({
  title,
  text,
  image,
  imageVariant,
  imageSizes,
  className,
}: ColumnsSectionItemProps) => {
  const isCircleBackgroundVariant =
    imageVariant === 'columnsSection_imageVariant_withCircleBackground'
  const isOriginalSizeVariant = imageVariant === 'columnsSection_imageVariant_imageOriginalSize'

  return (
    <div className={cn('flex grow justify-center', className)}>
      <div className="flex w-full flex-col items-center gap-4">
        {image ? (
          <div
            className={cn('flex shrink-0 items-center justify-center', {
              'rounded-full bg-category-200 p-6': isCircleBackgroundVariant,
              'w-full': isOriginalSizeVariant,
            })}
          >
            <div className={cn({ 'relative h-18 w-18': isCircleBackgroundVariant })}>
              <StrapiImage
                alt=""
                image={image}
                sizes={imageSizes}
                // pointer-events must be disabled to drag-events work properly in Slider
                className={cn('pointer-events-none', {
                  'object-contain': isCircleBackgroundVariant,
                })}
                fill={isCircleBackgroundVariant}
              />
            </div>
          </div>
        ) : null}

        <div className="flex flex-col gap-2 text-center empty:hidden">
          {title ? (
            <Typography variant="h5" as="h3">
              {title}
            </Typography>
          ) : null}
          {/* We use Markdown formatting to allow bold, even tho there is only long text field in Strapi */}
          {text ? <Markdown>{text}</Markdown> : null}
        </div>
      </div>
    </div>
  )
}

export default ColumnsSectionItem
