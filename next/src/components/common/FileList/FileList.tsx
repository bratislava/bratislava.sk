import { Typography } from '@bratislava/component-library'
import { Fragment } from 'react'

import FileRowCardWrapper from '@/src/components/cards/FileRowCardWrapper'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import { FileBlockFragment, FileItemBlockFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'

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
          {title ? <Typography variant="h2">{title}</Typography> : null}
          {text ? <Typography variant="p-default">{text}</Typography> : null}
        </div>
      ) : null}

      <ul className="flex flex-col rounded-lg border-2 py-2">
        {files.map((file, index) => (
          <Fragment key={file.id}>
            {index > 0 ? <HorizontalDivider asListItem className="mx-4 lg:mx-6" /> : null}
            <li className="w-full">
              <FileRowCardWrapper fileItem={file} />
            </li>
          </Fragment>
        ))}
      </ul>
    </div>
  )
}

export default FileList
