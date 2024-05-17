import React from 'react'

import { Enum_Componentsectionsfilelist_Variant, FileListSectionFragment } from '@/backend/graphql'
import FileList from '@/components/ui/FileList/FileList'
import { groupByCategoryFileList } from '@/utils/page'
import { isPresent } from '@/utils/utils'

type FileListSectionProps = {
  section: FileListSectionFragment
}

const FileListSection = ({ section }: FileListSectionProps) => {
  return (
    <FileList
      variantFileList={section.variantFileList ?? Enum_Componentsectionsfilelist_Variant.Grid}
      fileSections={groupByCategoryFileList(section.fileList?.filter(isPresent) ?? [])}
    />
  )
}

export default FileListSection
