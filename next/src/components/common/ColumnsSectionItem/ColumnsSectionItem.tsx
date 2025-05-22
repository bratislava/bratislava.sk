import { Typography } from '@bratislava/component-library'
import React from 'react'

import StrapiImage from '@/src/components/common/Image/StrapiImage'
import { ColumnsSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

type ColumnsSectionItemProps = ColumnsSectionFragment['columns'][0] & {
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
  imageSizes,
  className,
}: ColumnsSectionItemProps) => {
  return (
    <div className={cn('flex grow justify-center', className)}>
      <div className="flex flex-col items-center gap-4">
        {image?.data?.attributes ? (
          <div>
            <StrapiImage
              image={image.data.attributes}
              sizes={imageSizes}
              // pointer-events must be disabled to drag-events work properly in Slider
              className="pointer-events-none"
            />
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
