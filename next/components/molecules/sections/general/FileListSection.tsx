import { FileListSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { FileList } from '@bratislava/ui-bratislava/FileList/FileList'
import { groupByCategoryFileList } from '@utils/page'
import { isPresent } from '@utils/utils'
import React from 'react'

type FileListSectionProps = {
  section: FileListSectionFragment
}

const FileListSection = ({ section }: FileListSectionProps) => {
  return (
    <FileList fileSections={groupByCategoryFileList(section.fileList?.filter(isPresent) ?? [])} />
  )
}

export default FileListSection
