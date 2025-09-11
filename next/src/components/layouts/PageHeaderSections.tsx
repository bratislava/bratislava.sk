import React from 'react'

import { Breadcrumb } from '@/src/components/common/Breadcrumbs/Breadcrumbs'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import PageHeaderEvent from '@/src/components/sections/headers/PageHeaderEvent'
import PageHeaderFacility from '@/src/components/sections/headers/PageHeaderFacility'
import SubpageListPageHeaderSection from '@/src/components/sections/headers/SubpageListPageHeaderSection_Deprecated'
import { PageEntityFragment, PageHeaderSectionsFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'

type Props = Pick<
  PageEntityFragment,
  'title' | 'subtext' | 'headerLinks' | 'pageBackgroundImage'
> & {
  breadcrumbs: Breadcrumb[]
  header: PageHeaderSectionsFragment | null | undefined
  hasSubnavigationTmp?: boolean
}

const PageHeaderSections = ({
  title,
  subtext,
  headerLinks,
  pageBackgroundImage,
  breadcrumbs,
  header,
  hasSubnavigationTmp,
}: Props) => {
  const filteredHeaderLinks = headerLinks?.filter(isDefined) ?? []

  switch (header?.__typename) {
    case 'ComponentSectionsSubpageList':
      return hasSubnavigationTmp ? (
        <PageHeader
          title={title}
          subtext={subtext}
          breadcrumbs={breadcrumbs}
          headerLinks={filteredHeaderLinks}
          imageSrc={pageBackgroundImage?.url}
        />
      ) : (
        <SubpageListPageHeaderSection
          title={title}
          subtext={subtext}
          breadcrumbs={breadcrumbs}
          headerLinks={filteredHeaderLinks}
          imageSrc={pageBackgroundImage?.url}
          header={header}
        />
      )

    case 'ComponentHeaderSectionsEvent':
      return (
        <PageHeaderEvent
          title={title}
          breadcrumbs={breadcrumbs}
          headerLinks={filteredHeaderLinks}
          image={pageBackgroundImage}
          header={header}
        />
      )

    case 'ComponentHeaderSectionsFacility':
      return (
        <PageHeaderFacility
          title={title}
          breadcrumbs={breadcrumbs}
          headerLinks={filteredHeaderLinks}
          header={header}
        />
      )

    default:
      return (
        <PageHeader
          title={title}
          subtext={subtext}
          breadcrumbs={breadcrumbs}
          headerLinks={filteredHeaderLinks}
          imageSrc={pageBackgroundImage?.url}
        />
      )
  }
}

export default PageHeaderSections
