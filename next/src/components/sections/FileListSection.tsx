import React from 'react'

import FileList from '@/src/components/common/FileList/FileList'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { FileListSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type FileListSectionProps = {
  section: FileListSectionFragment
}

const FileListSection = ({ section }: FileListSectionProps) => {
  return (
    <SectionContainer>
      <FileList
        title={section.title}
        text={section.text}
        files={section.fileList?.filter(isDefined) ?? []}
      />
    </SectionContainer>
  )
}

export default FileListSection
