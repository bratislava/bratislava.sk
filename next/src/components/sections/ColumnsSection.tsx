import { Typography } from '@bratislava/component-library'
import React from 'react'

import ColumnsSectionItem from '@/src/components/common/ColumnsSectionItem/ColumnsSectionItem'
import { ColumnsSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: ColumnsSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=5865-16442&t=TcrEN6rQPU300Ipo-0
 */

const ColumnsSection = ({ section }: Props) => {
  const { title, text, columns, imageVariant } = section

  // eslint-disable-next-line unicorn/no-array-callback-reference
  const filteredColumns = columns?.filter(isDefined) ?? []

  return (
    <div className="flex flex-col gap-6 lg:gap-12">
      {title || text ? (
        <div className="flex">
          <div className={cn('grow text-center')}>
            {title ? <Typography variant="h2">{title}</Typography> : null}
            {text ? (
              <Typography variant="p-default" className="not-first:mt-2">
                {text}
              </Typography>
            ) : null}
          </div>
        </div>
      ) : null}

      {/* Screen: Desktop */}
      <ul className="flex w-full flex-wrap items-stretch justify-center gap-4 gap-y-6 max-lg:hidden lg:gap-8 lg:gap-y-14">
        {filteredColumns.map((item, index) => {
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
              className={cn('w-[33%] max-w-[50%]', {
                // Control number of items per row based on their count so it looks good
                'w-full max-w-[100%] sm:max-w-full': filteredColumns.length === 1,
                'w-[40%] max-w-[100%] sm:max-w-full': filteredColumns.length === 2,
                'sm:w-[25%]': filteredColumns.length % 3 === 0,
                'sm:w-[20%] sm:max-w-[22%]':
                  filteredColumns.length > 2 && filteredColumns.length % 3 === 1,
                'sm:w-[25%] sm:max-w-[33%]':
                  filteredColumns.length > 2 && filteredColumns.length % 3 === 2,
              })}
            >
              <ColumnsSectionItem
                {...item}
                imageVariant={imageVariant}
                imageSizes={generateImageSizes({
                  default: '100vw',
                  // Note that this doesn't match the logic above for 100%, but it's okay, because it's just a simple optimization
                  sm: filteredColumns.length === 2 ? '50vw' : '33vw',
                })}
                className="w-full"
              />
            </li>
          )
        })}
      </ul>

      {/* Screen: Mobile */}
      <ul className="grid grid-cols-1 gap-x-8 gap-y-12">
        {filteredColumns.map((item, index) => {
          return (
            <li
              // eslint-disable-next-line react/no-array-index-key
              key={index}
            >
              <ColumnsSectionItem
                {...item}
                imageVariant={imageVariant}
                imageSizes={generateImageSizes({ default: '100vw' })}
                className="w-full"
              />
            </li>
          )
        })}
      </ul>
      {/* TODO take Slider v OLO */}
      {/* <Slider */}
      {/*   aria-labelledby={titleId} */}
      {/*   items={filteredColumns.map((item, index) => { */}
      {/*     return ( */}
      {/*       <ColumnsSectionItem */}
      {/*         // eslint-disable-next-line react/no-array-index-key */}
      {/*         key={index} */}
      {/*         {...item} */}
      {/*         imageSizes={generateImageSizes({ default: '100vw' })} */}
      {/*         className="w-full" */}
      {/*       /> */}
      {/*     ) */}
      {/*   })} */}
      {/*   className="lg:hidden" */}
      {/* /> */}
    </div>
  )
}

export default ColumnsSection
