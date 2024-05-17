import React from 'react'

import SubpageList from '@/components/ui/SubpageList/SubpageList'
import { SubpageListPageHeaderSectionFragment } from '@/services/graphql'
import { parsePageLink } from '@/utils/page'
import { isPresent } from '@/utils/utils'

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
