import FileCard from '@components/molecules/presentation/FileCard'
import FileRowCard from '@components/molecules/presentation/FileRowCard'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import { formatFileSize } from '@utils/formatFileSize'
import cx from 'classnames'
import { useLocale } from 'next-intl'

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
  hideCategory?: boolean
  noScroll?: boolean //TYCI na co sluzi toto?
  cardType?: 'grid' | 'row' //TYCI pridane zatial
}

export const FileList = ({
  className,
  fileSections,
  hideCategory,
  noScroll,
  cardType = 'row', //TYCI pridane zatial
}: FileListProps) => {
  const locale = useLocale()

  return (
    <div className={className}>
      {fileSections?.map((fileSection, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          // TYCI tymto divom si nie som isty, je z minula
          <div key={index} className={cx({ 'mt-8 lg:mt-14': index > 0 })}>
            <div className="flex-col" key={fileSection.category ?? ''}>
              {fileSection.category && !hideCategory && (
                <h2 className="text-h2">{fileSection.category}</h2>
              )}
              {cardType === 'row' && (
                <div className="mt-8 flex flex-col">
                  {fileSection?.files.map((file, sectionIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={sectionIndex} className="w-full">
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
                    </div>
                  ))}
                </div>
              )}
              {cardType === 'grid' && (
                <div>
                  <div className="mt-8 hidden grid-cols-3 gap-8 lg:grid">
                    {fileSection?.files.map((file, sectionIndex) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <div key={sectionIndex} className="w-full">
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
                      </div>
                    ))}
                  </div>
                  {/* TYCI otazka - co robi noScroll? */}
                  {!noScroll && (
                    <div className="block lg:hidden">
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
              )}
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default FileList
