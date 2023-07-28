import FileCard, { FileCardProps } from '@components/molecules/presentation/FileCard'
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
  cardType?: 'grid' | 'row' //TYCI pridane zatial
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7940-21473&mode=dev
 */

export const FileList = ({
  className,
  fileSections,
  hideCategory,
  cardType = 'row', //TYCI pridane zatial
}: FileListProps) => {
  const locale = useLocale()

  function transformFileProps(file: TFile) {
    const fileProps = {
      title: file.title,
      downloadLink: file.media?.url,
      format: file.media?.ext?.replace(/^\./, '').toUpperCase(),
      size:
        file.media && file.media.size > 0 ? formatFileSize(file.media?.size, locale) : undefined,
      uploadDate: file.media?.created_at,
    } as FileCardProps

    return fileProps
  }

  return (
    <div className={className}>
      {fileSections?.map((fileSection, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={cx({ 'mt-8 lg:mt-14': index > 0 })}>
            {fileSection.category && !hideCategory && (
              <h2 className="text-h2">{fileSection.category}</h2>
            )}
            {cardType === 'row' && (
              <div className="mt-4 flex flex-col lg:mt-6">
                {fileSection?.files.map((file, sectionIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={sectionIndex} className="w-full">
                    <FileRowCard {...transformFileProps(file)} />
                  </div>
                ))}
              </div>
            )}
            {cardType === 'grid' && (
              <div>
                <div className="mt-6 hidden grid-cols-3 gap-8 lg:grid">
                  {fileSection?.files.map((file, sectionIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={sectionIndex} className="w-full">
                      <FileCard {...transformFileProps(file)} />
                    </div>
                  ))}
                </div>
                <div className="block lg:hidden">
                  <ResponsiveCarousel
                    items={fileSection?.files.map((file, sectionIndex) => (
                      <FileCard {...transformFileProps(file)} />
                    ))}
                  />
                </div>
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}

export default FileList
