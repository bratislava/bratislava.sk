import React from 'react'

import FileList from '@/components/common/FileList/FileList'
import { FileListSectionFragment } from '@/services/graphql'
import { groupByCategoryFileList } from '@/utils/pageUtils_Deprecated'
import { isPresent } from '@/utils/utils'

type FileListSectionProps = {
  section: FileListSectionFragment
}

// TODO remove grouping by category
const FileListSection = ({ section }: FileListSectionProps) => {
  return (
    <FileList
      title={section.title}
      text={section.text}
      hideCategory={!!section.title || !!section.text}
      fileSections={groupByCategoryFileList(section.fileList?.filter(isPresent) ?? [])}
    />
  )
}

export default FileListSection
