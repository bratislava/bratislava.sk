import * as React from 'react'
import { useMemo } from 'react'

import PageHeader from '@/components/common/PageHeader/PageHeader'
import PageHeaderSections from '@/components/layouts/PageHeaderSections'
import Sections from '@/components/layouts/Sections'
import RelatedBlogPostsSection from '@/components/sections/RelatedBlogPostsSection'
import { PageEntityFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'
import { getPageBreadcrumbs } from '@/utils/pageUtils_Deprecated'

export type GeneralPageProps = {
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
    </>
  )
}

export default GeneralPageContent
