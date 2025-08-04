import React from 'react'

import PageHeader, { PageHeaderProps } from '@/src/components/common/PageHeader/PageHeader'
import SubpageList from '@/src/components/common/SubpageList_Deprecated/SubpageList_Deprecated'
import { SubpageListPageHeaderSectionFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = PageHeaderProps & {
  header: SubpageListPageHeaderSectionFragment
}

const SubpageListPageHeaderSection = ({
  title,
  subtext,
  breadcrumbs,
  headerLinks,
  imageSrc,
  header,
}: Props) => {
  return (
    <PageHeader
      title={title}
      subtext={subtext}
      breadcrumbs={breadcrumbs}
      headerLinks={headerLinks?.filter(isDefined)}
      imageSrc={imageSrc}
    >
      <SubpageList subpageList={header?.subpageList} />
    </PageHeader>
  )
}

export default SubpageListPageHeaderSection
