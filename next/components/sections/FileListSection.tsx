import React from 'react'

import FileList from '@/components/common/FileList/FileList'
import { FileListSectionFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

type FileListSectionProps = {
  section: FileListSectionFragment
}

const FileListSection = ({ section }: FileListSectionProps) => {
  return (
    <FileList
      title={section.title}
      text={section.text}
      files={section.fileList?.filter(isDefined) ?? []}
    />
  )
}

export default FileListSection
