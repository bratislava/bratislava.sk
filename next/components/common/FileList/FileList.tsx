import { Typography } from '@bratislava/component-library'

import FileRowCardWrapper from '@/components/cards/FileRowCardWrapper'
import HorizontalDivider from '@/components/common/Divider/HorizontalDivider'
import { FileBlockFragment, FileItemBlockFragment } from '@/services/graphql'
import cn from '@/utils/cn'

export type FileListProps = {
  title?: string | null | undefined
  text?: string | null | undefined
  className?: string
  files: FileItemBlockFragment[] | FileBlockFragment[]
}

/**
 * Figma: https://www.figma.com/file/17wbd0MDQcMW9NbXl6UPs8/DS-ESBS%2BBK%3A-Component-library?type=design&node-id=7940-21473&mode=dev
 */

const FileList = ({ className, title, text, files }: FileListProps) => {
  return (
    <div className={cn('flex flex-col gap-4 lg:gap-6', className)}>
      {title || text ? (
        <div className="flex flex-col gap-2">
          {title ? <Typography type="h2">{title}</Typography> : null}
          {text ? <Typography type="p">{text}</Typography> : null}
        </div>
      ) : null}

      <ul className="flex flex-col rounded-lg border-2 py-2">
        {files.map((file, index) => (
          <>
            {index > 0 ? <HorizontalDivider className="mx-4 lg:mx-6" /> : null}
            {/* eslint-disable-next-line react/no-array-index-key */}
            <li key={index} className="w-full">
              <FileRowCardWrapper fileItem={file} />
            </li>
          </>
        ))}
      </ul>
    </div>
  )
}

export default FileList
