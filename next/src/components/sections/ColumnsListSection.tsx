import React from 'react'

import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { ColumnsListSectionFragment } from '@/src/services/graphql'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { isDefined } from '@/src/utils/isDefined'
import StrapiImage from '@/src/components/common/Image/StrapiImage'
import Markdown from '@/src/components/formatting/Markdown/Markdown'

type Props = {
  section: ColumnsListSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=21143-18394&t=MUzJWPA0GjZQj44Y-4
 */

const ColumnsListSection = ({ section }: Props) => {
  const { title, text, leftColumn, rightColumn } = section

  return (
    <SectionContainer className="w-full">
      <div className="flex flex-col gap-6 lg:gap-8">
        <SectionHeader title={title} text={text} />

        <div className="grid gap-3 lg:grid-cols-2 lg:gap-8">
          {[leftColumn, rightColumn]
            .filter((column) => column?.length)
            .map((column, columnIndex) => {
              return (
                // eslint-disable-next-line react/no-array-index-key
                <div key={columnIndex} className="flex flex-col gap-3 lg:gap-4">
                  {column
                    ?.map((columnItem, columnItemIndex) => {
                      if (!columnItem) {
                        return null
                      }

                      const icon = columnItem.icon

                      return (
                        // eslint-disable-next-line react/no-array-index-key
                        <div key={columnItemIndex} className="flex gap-4">
                          {icon ? (
                            <div className="relative size-6 shrink-0">
                              <StrapiImage
                                image={icon}
                                alt=""
                                fill
                                sizes={generateImageSizes({ default: '50vw', lg: '10vw' })}
                                className="object-contain"
                              />
                            </div>
                          ) : null}
                          <Markdown content={columnItem.content} />
                        </div>
                      )
                    })
                    .filter(isDefined)}
                </div>
              )
            })}
        </div>
      </div>
    </SectionContainer>
  )
}

export default ColumnsListSection
