import { PageEntityFragment } from '@backend/graphql'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import RelatedBlogPostsSection from '@components/molecules/sections/general/RelatedBlogPostsSection'
import { isDefined } from '@utils/isDefined'
import { getPageBreadcrumbs } from '@utils/page'
import * as React from 'react'
import { useMemo } from 'react'

import PageHeaderSections from '../molecules/PageHeaderSections'
import Sections from '../molecules/Sections'

export interface GeneralPageProps {
  page: PageEntityFragment
}

const GeneralPageContent = ({ page }: GeneralPageProps) => {
  const breadcrumbs = useMemo(() => getPageBreadcrumbs(page), [page])

  return (
    <>
      {/* Header */}
      <PageHeader
        title={page.attributes?.title}
        subtext={page.attributes?.subtext}
        breadcrumbs={breadcrumbs}
        buttons={page.attributes?.headerLinks?.filter(isDefined)}
        imageSrc={page.attributes?.pageBackgroundImage?.data?.attributes?.url}
      >
        <PageHeaderSections sections={page.attributes?.pageHeaderSections} />
      </PageHeader>

      {/* Page - Common Sections */}
      <div className="mb-8">
        {page.attributes?.sections && <Sections sections={page.attributes.sections} />}
        <RelatedBlogPostsSection
          page={page}
          // The same as Section
          className="pt-10 md:pt-18"
        />
      </div>
      <div className="mb-8" />
    </>
  )
}

export default GeneralPageContent
