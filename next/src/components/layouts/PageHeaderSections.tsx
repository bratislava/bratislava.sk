import React from 'react'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import SubpageListPageHeaderSection from '@/src/components/sections/headers/SubpageListPageHeaderSection_Deprecated'
import { PageEntityFragment, PageHeaderSectionsFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = Pick<
  PageEntityFragment,
  'title' | 'subtext' | 'headerLinks' | 'pageBackgroundImage'
> & {
  breadcrumbs: Breadcrumb[]
  header: PageHeaderSectionsFragment | null | undefined
}

const PageHeaderSections = ({
  title,
  subtext,
  headerLinks,
  pageBackgroundImage,
  breadcrumbs,
  header,
}: Props) => {
  // eslint-disable-next-line sonarjs/no-small-switch
  switch (header?.__typename) {
    case 'ComponentSectionsSubpageList':
      return (
        <SubpageListPageHeaderSection
          title={title}
          subtext={subtext}
          breadcrumbs={breadcrumbs}
          headerLinks={headerLinks?.filter(isDefined)}
          imageSrc={pageBackgroundImage?.url}
          header={header}
        />
      )

    default:
      return (
        <PageHeader
          title={title}
          subtext={subtext}
          breadcrumbs={breadcrumbs}
          headerLinks={headerLinks?.filter(isDefined)}
          imageSrc={pageBackgroundImage?.url}
        />
      )
  }
}

export default PageHeaderSections
