import { Typography } from '@bratislava/component-library'
import cn from 'utils/cn'

import FileCardWrapper from '@/components/cards/FileCardWrapper'
import ResponsiveCarousel from '@/components/common/Carousel/ResponsiveCarousel'
import { Enum_Componentsectionsfilelist_Variant, FileItemBlockFragment } from '@/services/graphql'

export type TFileSection = {
  category?: string
  files: FileItemBlockFragment[]
}

export type FileListProps = {
  className?: string
  fileSections?: TFileSection[]
  hideCategory?: boolean
  variantFileList?: Enum_Componentsectionsfilelist_Variant
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7940-21473&mode=dev
 */

const FileList = ({ className, fileSections, hideCategory, variantFileList }: FileListProps) => {
  return (
    <div className={className}>
      {fileSections?.map((fileSection, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={cn({ 'mt-8 lg:mt-14': index > 0 })}>
            {fileSection.category && !hideCategory && (
              <Typography type="h2">{fileSection.category}</Typography>
            )}
            {variantFileList === 'rows' && (
              <ul className="mt-4 flex flex-col rounded-lg border-2 py-2 lg:mt-6">
                {fileSection?.files.map((file, fileIndex) => (
                  // eslint-disable-next-line react/no-array-index-key
                  <li key={fileIndex} className="w-full">
                    <FileCardWrapper fileItem={file} variant={variantFileList} />
                  </li>
                ))}
              </ul>
            )}
            {variantFileList === 'grid' && (
              <div>
                <div
                  className="mt-6 hidden grid-cols-3 gap-8 lg:grid"
                  data-cy="file-wrapper-desktop"
                >
                  {fileSection?.files.map((file, fileIndex) => (
                    // eslint-disable-next-line react/no-array-index-key
                    <div key={fileIndex} className="w-full">
                      <FileCardWrapper fileItem={file} />
                    </div>
                  ))}
                </div>
                <div className="lg:hidden" data-cy="file-wrapper-mobile">
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
