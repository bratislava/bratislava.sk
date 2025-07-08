import React from 'react'

import SubpageList from '@/src/components/common/SubpageList_Deprecated/SubpageList_Deprecated'
import { SubpageListPageHeaderSectionFragment } from '@/src/services/graphql'

type SubpageListPageHeaderSectionProps = {
  section: SubpageListPageHeaderSectionFragment
}

const SubpageListPageHeaderSection = ({ section }: SubpageListPageHeaderSectionProps) => {
  return <SubpageList subpageList={section?.subpageList} />
}

export default SubpageListPageHeaderSection
