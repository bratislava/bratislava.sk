import { Typography } from '@bratislava/component-library'
import React from 'react'

import StrapiImage from '@/src/components/common/Image/StrapiImage'
import { ColumnsSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

type ColumnsSectionItemProps = ColumnsSectionFragment['columns'][0] & {
  imageVariant?: ColumnsSectionFragment['imageVariant']
  imageSizes?: string
  className?: string
}

/**
 * Figma: https://www.figma.com/design/2qF09hDT9QNcpdztVMNAY4/OLO-Web?node-id=1341-10129&m=dev
 */

const ColumnsSectionItem = ({
  title,
  text,
  image,
  imageVariant,
  imageSizes,
  className,
}: ColumnsSectionItemProps) => {
  return (
    <div className={cn('flex grow justify-center', className)}>
      <div className="flex w-full flex-col items-center gap-4">
        {image?.data?.attributes ? (
          <div
            className={cn('flex shrink-0 items-center justify-center', {
              'bg-category-200 rounded-full p-6':
                imageVariant === 'columnsSection_variant_withCircleIconBackground',
              'w-full': imageVariant !== 'columnsSection_variant_withCircleIconBackground',
            })}
          >
            {/* For variants withCircleIconBackground and imageFixedSize, we set the parent div to be `relative`,
                and we use `fill` property with `object-contain` class on the image */}
            <div
              className={cn('relative', {
                'relative h-18 w-18':
                  imageVariant === 'columnsSection_variant_withCircleIconBackground',
                'relative h-30 w-full': imageVariant === 'columnsSection_variant_imageFixedSize',
                // no classes for imageVariant === 'columnsSection_variant_imageNonFixedSize'
              })}
            >
              {imageVariant === 'columnsSection_variant_imageNonFixedSize' ? (
                <StrapiImage
                  image={image.data.attributes}
                  sizes={imageSizes}
                  // pointer-events must be disabled to drag-events work properly in Slider
                  className="pointer-events-none"
                  alt=""
                />
              ) : (
                <StrapiImage
                  image={image.data.attributes}
                  sizes={imageSizes}
                  // pointer-events must be disabled to drag-events work properly in Slider
                  className="pointer-events-none object-contain"
                  fill
                  alt=""
                />
              )}
            </div>
          </div>
        ) : null}
        <div className="flex flex-col gap-2 text-center empty:hidden">
          {title ? (
            <Typography variant="h5" as="h3">
              {title}
            </Typography>
          ) : null}
          {text ? <Typography>{text}</Typography> : null}
        </div>
      </div>
    </div>
  )
}

export default ColumnsSectionItem
