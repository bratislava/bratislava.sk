import { Typography } from '@bratislava/component-library'
import cn from 'utils/cn'

import FileCardWrapper from '@/components/cards/FileCardWrapper'
import { FileItemBlockFragment } from '@/services/graphql'

export type TFileSection = {
  category?: string
  files: FileItemBlockFragment[]
}

export type FileListProps = {
  title?: string | null | undefined
  text?: string | null | undefined
  className?: string
  fileSections?: TFileSection[]
  hideCategory?: boolean
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7940-21473&mode=dev
 */

// TODO remove grouping by category
const FileList = ({ className, title, text, fileSections, hideCategory }: FileListProps) => {
  return (
    <div className={cn('', className)}>
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title ? <Typography type="h2">{title}</Typography> : null}
          {text ? <Typography type="p">{text}</Typography> : null}
        </div>
      ) : null}

      {fileSections?.map((fileSection, index) => {
        return (
          // eslint-disable-next-line react/no-array-index-key
          <div key={index} className={cn({ 'mt-8 lg:mt-14': index > 0 })}>
            {fileSection.category && !hideCategory && (
              <Typography type="h2">{fileSection.category}</Typography>
            )}
            <ul className="mt-4 flex flex-col rounded-lg border-2 py-2 lg:mt-6">
              {fileSection?.files.map((file, fileIndex) => (
                // eslint-disable-next-line react/no-array-index-key
                <li key={fileIndex} className="w-full">
                  <FileCardWrapper
                    fileItem={file}
                    variant="rows"
                    hideBottomDivider={fileIndex === fileSection.files.length - 1}
                  />
                </li>
              ))}
            </ul>
          </div>
        )
      })}
    </div>
  )
}

export default FileList
