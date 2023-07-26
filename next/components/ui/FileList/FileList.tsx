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
  noScroll?: boolean
  cardType?: 'grid' | 'row' //TYCI pridane zatial
}

export const FileList = ({
  className,
  fileSections,
  hideCategory,
  noScroll,
  cardType = 'grid', //TYCI pridane zatial
}: FileListProps) => {
  const locale = useLocale()

  return (
    <div className={className}>
      {fileSections?.map((fileSection, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={cx({ 'mt-8 lg:mt-14': index > 0 })}>
            <div className="flex-col gap-y-6 space-y-8" key={fileSection.category ?? ''}>
              {fileSection.category && !hideCategory && (
                <h2 className="text-h2">{fileSection.category}</h2>
              )}
              {/* TYCI az toto je FileRowCard specific */}
              {cardType === 'row' && (
                <div className="flex flex-col">
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
                  <div className="hidden grid-cols-3 gap-8 lg:grid">
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
