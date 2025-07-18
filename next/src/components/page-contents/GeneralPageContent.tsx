import * as React from 'react'
import { useMemo } from 'react'

import AliasInfoMessage from '@/src/components/common/AliasInfoMessage/AliasInfoMessage'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import PageHeaderSections from '@/src/components/layouts/PageHeaderSections'
import SectionContainer from '@/src/components/layouts/SectionContainer'
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

  const filteredSections = page.sections?.filter(isDefined) ?? []

  return (
    <>
      {/* Header */}
      <PageHeader
        title={page.title}
        subtext={page.subtext}
        breadcrumbs={breadcrumbs}
        buttons={page.headerLinks?.filter(isDefined)}
        imageSrc={page.pageBackgroundImage?.url}
      >
        <PageHeaderSections sections={page.pageHeaderSections} />
      </PageHeader>

      {/* Page - Common Sections */}
      <div className="py-8">
        <Sections sections={filteredSections} className="*:py-5 *:md:py-9" />

        <RelatedArticlesSection page={page} className="pt-5 lg:pt-9" />
      </div>

      {page.alias ? (
        <SectionContainer>
          <AliasInfoMessage alias={page.alias} variant="page" />
        </SectionContainer>
      ) : null}
    </>
  )
}

export default GeneralPageContent
