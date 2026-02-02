import React from 'react'

import ColumnsSectionItem from '@/src/components/common/ColumnsSectionItem/ColumnsSectionItem'
import Slider from '@/src/components/common/Slider/Slider'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { ColumnsListSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  section: ColumnsListSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=5865-16442&t=TcrEN6rQPU300Ipo-0
 */

const ColumnsSection = ({ section }: Props) => {
  const { title, text, leftColumn, rightColumn } = section

  const filteredLeftColumn = leftColumn?.filter(isDefined) ?? []
  const filteredRightColumn = rightColumn?.filter(isDefined) ?? []

  return (
    <SectionContainer>
      <div className="flex flex-col gap-6 lg:gap-12">
        <SectionHeader title={title} text={text} isCentered />
        {/* Screen: Desktop */}
        <ul className="flex w-full flex-wrap items-stretch justify-center gap-4 gap-y-6 max-lg:hidden lg:gap-8 lg:gap-y-14">
          {filteredLeftColumn.map((item, index) => {
            return (
              <li
                key={index}
                className={cn('w-[33%] max-w-[50%]', {
                  // Control number of items per row based on their count so it looks good
                  'w-full max-w-[100%] sm:max-w-full': filteredLeftColumn.length === 1,
                  'w-[40%] max-w-[100%] sm:max-w-full': filteredLeftColumn.length === 2,
                  'sm:w-[25%]': filteredLeftColumn.length % 3 === 0,
                  'sm:w-[20%] sm:max-w-[22%]':
                    filteredLeftColumn.length > 2 && filteredLeftColumn.length % 3 === 1,
                  'sm:w-[25%] sm:max-w-[33%]':
                    filteredLeftColumn.length > 2 && filteredLeftColumn.length % 3 === 2,
                })}
              >
                {item.content}
                {/* <ColumnsSectionItem
                  {...item}
                  imageVariant={imageVariant}
                  imageSizes={generateImageSizes({
                    default: '100vw',
                    // Note that this doesn't match the logic above for 100%, but it's okay, because it's just a simple optimization
                    sm: filteredColumns.length === 2 ? '50vw' : '33vw',
                  })}
                  className="w-full"
                /> */}
              </li>
            )
          })}
        </ul>

        {/* Screen: Mobile */}
        {/* {responsiveLayout === 'columnsSection_responsiveLayout_slider' ? (
          <Slider
            // aria-labelledby={titleId} // TODO for better accessibility
            items={filteredColumns.map((item, index) => {
              return (
                <ColumnsSectionItem
                  key={index}
                  {...item}
                  imageVariant={imageVariant}
                  imageSizes={generateImageSizes({ default: '100vw' })}
                  className="w-full"
                />
              )
            })}
            className="lg:hidden"
          />
        ) : (
          <ul className="flex flex-col gap-8 lg:hidden">
            {filteredColumns.map((item, index) => {
              return (
                <li key={index}>
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
        )} */}
      </div>
    </SectionContainer>
  )
}

export default ColumnsSection
