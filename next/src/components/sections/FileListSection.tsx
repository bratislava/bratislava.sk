import React from 'react'

import FileList from '@/src/components/common/FileList/FileList'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import { FileListSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type FileListSectionProps = {
  section: FileListSectionFragment
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16920-16879&m=dev
 */

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
