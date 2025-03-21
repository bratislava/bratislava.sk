import React from 'react'

import SubpageList from '@/src/components/common/SubpageList_Deprecated/SubpageList_Deprecated'
import { SubpageListPageHeaderSectionFragment } from '@/src/services/graphql'
import { parsePageLink } from '@/src/utils/pageUtils_Deprecated'
import { isPresent } from '@/src/utils/utils'

type SubpageListPageHeaderSectionProps = {
  section: SubpageListPageHeaderSectionFragment
}

const SubpageListPageHeaderSection = ({ section }: SubpageListPageHeaderSectionProps) => {
  return (
    <SubpageList
      className="mt-10"
      // eslint-disable-next-line @typescript-eslint/no-unsafe-call,@typescript-eslint/no-unsafe-member-access
      subpageList={section?.subpageList?.map(parsePageLink).filter(isPresent)}
    />
  )
}

export default SubpageListPageHeaderSection
