import { Enum_Componentsectionsfilelist_Variant, FileItemBlockFragment } from '@backend/graphql'
import FileCardWrapper from '@components/molecules/presentation/FileCardWrapper'
import ResponsiveCarousel from '@components/organisms/Carousel/ResponsiveCarousel'
import cx from 'classnames'

export type TFileSection = {
  category?: string
  files: FileItemBlockFragment[]
}

export interface FileListProps {
  className?: string
  fileSections?: TFileSection[]
  hideCategory?: boolean
  variantFileList?: Enum_Componentsectionsfilelist_Variant
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7940-21473&mode=dev
 */

export const FileList = ({
  className,
  fileSections,
  hideCategory,
  variantFileList,
}: FileListProps) => {
  return (
    <div className={className}>
      {fileSections?.map((fileSection, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={cx({ 'mt-8 lg:mt-14': index > 0 })}>
            {fileSection.category && !hideCategory && (
              <h2 className="text-h2">{fileSection.category}</h2>
            )}
            {variantFileList === 'rows' && (
              <div className="mt-4 flex flex-col lg:mt-6">
                {fileSection?.files.map((file, fileIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <div key={fileIndex} className="w-full">
                    <FileCardWrapper fileItem={file} variant={variantFileList} />
                  </div>
                ))}
              </div>
            )}
            {variantFileList === 'grid' && (
              <div>
                <div className="mt-6 hidden grid-cols-3 gap-8 lg:grid">
                  {fileSection?.files.map((file, fileIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={fileIndex} className="w-full">
                      <FileCardWrapper fileItem={file} />
                    </div>
                  ))}
                </div>
                <div className="block lg:hidden">
                  <ResponsiveCarousel
                    items={fileSection?.files.map((file, fileIndex) => (
                      // eslint-disable-next-line react/no-array-index-key
                      <FileCardWrapper key={fileIndex} fileItem={file} />
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
