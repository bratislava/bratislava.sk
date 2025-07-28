import * as React from 'react'
import { useMemo } from 'react'

import AliasInfoMessage from '@/src/components/common/AliasInfoMessage/AliasInfoMessage'
import PageHeader from '@/src/components/common/PageHeader/PageHeader'
import { TABLE_OF_CONTENTS_WRAPPER_ID } from '@/src/components/common/TableOfContents/useHeadings'
import PageHeaderSections from '@/src/components/layouts/PageHeaderSections'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import Sections from '@/src/components/layouts/Sections'
import Sidebars from '@/src/components/layouts/Sidebars'
import RelatedArticlesSection from '@/src/components/sections/RelatedArticlesSection'
import TableOfContentsSection from '@/src/components/sections/TableOfContentsSection'
import { PageEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { isDefined } from '@/src/utils/isDefined'
import { getPageBreadcrumbs } from '@/src/utils/pageUtils_Deprecated'

export type GeneralPageProps = {
  page: PageEntityFragment
}

const GeneralPageContent = ({ page }: GeneralPageProps) => {
  const breadcrumbs = useMemo(() => getPageBreadcrumbs(page), [page])

  const filteredSections = page.sections?.filter(isDefined) ?? []

  // Sidebar has always max 1 element
  const [sidebar] = page.sidebar ?? []

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

      {/* Sections & Sidebar */}
      <div
        id={TABLE_OF_CONTENTS_WRAPPER_ID}
        key={page.documentId} // Helps to re-render table of contents on page change
        className={cn('flex flex-wrap-reverse gap-5 py-8 lg:gap-8', {
          'mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8': !!sidebar,
        })}
      >
        <div
          className={cn(
            'w-full',
            '[&_[data-sectionContainerOuter]]:not-first:pt-10',
            '[&_[data-sectionContainerOuter]]:not-first:lg:pt-18',
            {
              'w-[50rem]': !!sidebar,
              '[&_[data-sectionContainerInner]]:px-0': !!sidebar,
              '[&_[data-sectionContainerInner]]:lg:px-0': !!sidebar,
            },
          )}
        >
          <div className="flex w-full flex-col gap-5 lg:gap-9">
            {page.showTableOfContents && <TableOfContentsSection />}
            <Sections sections={filteredSections} />
            <RelatedArticlesSection page={page} />
          </div>
        </div>
        {sidebar ? <Sidebars sidebar={sidebar} className="max-w-[50rem] grow basis-72" /> : null}
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
