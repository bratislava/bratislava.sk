import React from 'react'

import FileList from '@/components/common/FileList/FileList'
import { Enum_Componentsectionsfilelist_Variant, FileListSectionFragment } from '@/services/graphql'
import { groupByCategoryFileList } from '@/utils/pageUtils_Deprecated'
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
