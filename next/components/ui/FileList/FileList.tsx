import Button from '@components/forms/simple-components/Button'
import FileCard from '@components/molecules/presentation/FileCard'
import FileRowCard from '@components/molecules/presentation/FileRowCard'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import { formatFileSize } from '@utils/formatFileSize'
import cx from 'classnames'
import { useLocale, useTranslations } from 'next-intl'
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
  cardType?: 'default' | 'row' //TYCI pridane
}

export const FileList = ({
  className,
  fileSections,
  hideCategory,
  noScroll,
  cardType = 'row', //TYCI pridane zatial
}: FileListProps) => {
  const locale = useLocale()

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
                  <h2 className="text-h2">{fileSection.category}</h2>
                )}
                {/* TYCI conditional style*/}
                <div
                  className={cx({
                    'grid grid-cols-3 gap-8': cardType === 'default',
                    'flex flex-col': cardType === 'row',
                  })}
                >
                  {fileSection?.files.map((file, sectionIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={sectionIndex} className="w-full">
                      {/* TYCI docasny conditional render kym zistim, ako sa to robi korektne.
                       * Urcite treba prerobit, lebo na malych displayoch to teraz prehodi na carousel, ktory renderuje opat FileCard*/}
                      {cardType === 'row' && (
                        <FileRowCard
                          title={file.title}
                          downloadLink={file.media?.url}
                          format={file.media?.ext?.replace(/^\./, '').toUpperCase()}
                          size={
                            file.media && file.media.size > 0
                              ? formatFileSize(file.media?.size, locale)
                              : undefined
                          }
                          uploadDate={file.media?.created_at}
                        />
                      )}
                      {cardType === 'default' && (
                        <FileCard
                          title={file.title}
                          downloadLink={file.media?.url}
                          format={file.media?.ext?.replace(/^\./, '').toUpperCase()}
                          size={
                            file.media && file.media.size > 0
                              ? formatFileSize(file.media?.size, locale)
                              : undefined
                          }
                          uploadDate={file.media?.created_at}
                        />
                      )}
                    </div>
                  ))}
                </div>
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
                          ? formatFileSize(file.media?.size, locale)
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
