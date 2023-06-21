import Button from '@components/forms/simple-components/Button'
import FileCard from '@components/molecules/presentation/FileCard'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React from 'react'

import { Divider } from '../Divider/Divider'

export type TFile = {
  title?: string
  category?: string
  media?: {
    url: string
    created_at: string
    size: number
    ext?: string
  }
}

export type TFileSection = {
  category: string
  files: TFile[]
}

export interface FileListProps {
  className?: string
  fileSections?: TFileSection[]
  dividerStyle?: string
  hideCategory?: boolean
  noScroll?: boolean
}

// Behaviour of the component as follows:
// - display first NUM_PREVIEW_ITEMS on initial load
// - display all files on click of "loadMore" button
// - when showing all files, if there are at least MIN_ITEMS_TO_DISPLAY_DIVIDERS files, display dividers between groups of NUM_ITEMS_PER_GROUP files)

const NUM_ITEMS_PER_GROUP = 9
const NUM_PREVIEW_ITEMS = 6
const MIN_ITEMS_TO_DISPLAY_DIVIDERS = 13

export const FileList = ({
  className,
  fileSections,
  dividerStyle = 'mesto',
  hideCategory,
  noScroll,
}: FileListProps) => {
  const t = useTranslations()

  const [showMore, setShowMore] = React.useState(false)
  // done like this because of typescript inference for useState
  const loadMoreInitialText = t('loadMore')
  const [buttonText, setButtonText] = React.useState(loadMoreInitialText)

  const handleClick = () => {
    if (showMore) {
      setButtonText(t('loadMore'))
    } else {
      setButtonText(t('showLess'))
    }
    setShowMore(!showMore)
  }
  return (
    <div className={className}>
      {/* TODO suggested sonarjs cognitive complexity refactor below */}
      {/* eslint-disable-next-line sonarjs/cognitive-complexity */}
      {fileSections?.map((fileSection, index) => {
        const { length } = fileSection.files
        const numberOfGroupsSeparatedByDividers = Math.ceil(length / NUM_ITEMS_PER_GROUP)
        const shouldDisplayDividers = showMore && length >= MIN_ITEMS_TO_DISPLAY_DIVIDERS

        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={cx({ 'mt-8 lg:mt-14': index > 0 })}>
            <div
              className={cx('flex-col space-y-8 lg:flex', { hidden: !noScroll })}
              key={fileSection.category ?? ''}
            >
              <div className="flex flex-col gap-y-6">
                {fileSection.category && !hideCategory && (
                  <span className="text-h4 font-medium">{fileSection.category}</span>
                )}
                {Array.from({ length: numberOfGroupsSeparatedByDividers }, (_, i) => {
                  const start = i * NUM_ITEMS_PER_GROUP
                  const end = showMore ? start + NUM_ITEMS_PER_GROUP : NUM_PREVIEW_ITEMS
                  const isLastGroup = i === numberOfGroupsSeparatedByDividers - 1
                  return (
                    <div key={i}>
                      <div className={cx('grid grid-cols-3 gap-x-7 gap-y-8')}>
                        {fileSection?.files.slice(start, end).map((file, sectionIndex) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <div key={sectionIndex} className="w-full">
                            <FileCard
                              title={file.title}
                              downloadLink={file.media?.url}
                              format={file.media?.ext?.replace(/^\./, '').toUpperCase()}
                              size={
                                file.media && file.media.size > 0
                                  ? `${file.media?.size.toString()} kB`
                                  : undefined
                              }
                              uploadDate={file.media?.created_at}
                            />
                          </div>
                        ))}
                      </div>
                      {shouldDisplayDividers && !isLastGroup && dividerStyle && (
                        <Divider className="pb-6 pt-18" dividerStyle={dividerStyle} />
                      )}
                    </div>
                  )
                })}
              </div>
              {length > NUM_PREVIEW_ITEMS && (
                <Button variant="category-outline" onPress={handleClick} className="self-center">
                  {buttonText}
                </Button>
              )}
            </div>
            {!noScroll && (
              <div className="block lg:hidden">
                <span className="text-h4 font-medium">{fileSection.category}</span>
                <ResponsiveCarousel
                  items={fileSection?.files.map((file, sectionIndex) => (
                    <FileCard
                      // eslint-disable-next-line react/no-array-index-key
                      key={sectionIndex}
                      title={file.title}
                      downloadLink={file.media?.url}
                      format={file.media?.ext?.replace(/^\./, '').toUpperCase()}
                      size={
                        file.media && file.media.size > 0
                          ? `${file.media?.size.toString()} kB`
                          : undefined
                      }
                      uploadDate={file.media?.created_at}
                    />
                  ))}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FileList
