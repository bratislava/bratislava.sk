import * as React from 'react'
import { useMemo } from 'react'

import AliasInfoMessage from '@/src/components/common/AliasInfoMessage/AliasInfoMessage'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import SectionContainer from '@/src/components/common/SectionContainer/SectionContainer'
import PageHeaderSections from '@/src/components/layouts/PageHeaderSections'
import Sections from '@/src/components/layouts/Sections'
import RelatedArticlesSection from '@/src/components/sections/RelatedArticlesSection'
import { PageEntityFragment } from '@/src/services/graphql'
import { isDefined } from '@/src/utils/isDefined'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'

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
        {page.attributes?.sections?.length ? (
          <Sections sections={page.attributes.sections} />
        ) : null}

        <RelatedArticlesSection
          page={page}
          // The same as Section
          className="pt-10 md:pt-18"
        />
      </div>

      {page.attributes?.alias ? (
        <SectionContainer>
          <AliasInfoMessage alias={page.attributes.alias} variant="page" />
        </SectionContainer>
      ) : null}
    </>
  )
}

export default GeneralPageContent
