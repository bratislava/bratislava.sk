import { useMemo } from 'react'

import AliasInfoMessage from '@/src/components/common/AliasInfoMessage/AliasInfoMessage'
import StarzSubmenu from '@/src/components/common/Submenu/StarzSubmenu'
import PageHeaderSections from '@/src/components/layouts/PageHeaderSections'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import Sections from '@/src/components/layouts/Sections'
import Sidebars from '@/src/components/layouts/Sidebars'
import RelatedArticlesSection from '@/src/components/sections/RelatedArticlesSection'
import SubnavigationSection from '@/src/components/sections/SubnavigationSection'
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

  // These fields have always max 1 element
  const [header] = page.pageHeaderSections ?? []
  const [sidebar] = page.sidebar ?? []

  const starzAdminGroup = page.adminGroups
    .filter(isDefined)
    .find((adminGroup) => adminGroup.adminGroupId === 'starz')

  return (
    <>
      {/* Starz submenu - TODO make it more generic in future when more organizations need it */}
      {starzAdminGroup?.landingPage ? (
        <StarzSubmenu landingPage={starzAdminGroup.landingPage} />
      ) : null}

      {/* Header */}
      <PageHeaderSections
        header={header}
        title={page.title}
        subtext={page.subtext}
        breadcrumbs={breadcrumbs}
        headerLinks={page.headerLinks?.filter(isDefined)}
        pageBackgroundImage={page.pageBackgroundImage}
      />

      {/* Sections & Sidebar */}
      <div
        key={page.documentId} // Helps to re-render table of contents on page change
        className={cn('flex flex-wrap-reverse gap-5 py-8 lg:gap-8', {
          'mx-auto max-w-(--breakpoint-xl) px-4 lg:px-8': !!sidebar,
        })}
      >
        <div
          className={cn(
            'w-full',
            '[&_[data-section-container-outer]]:not-first:pt-10',
            '[&_[data-section-container-outer]]:not-first:lg:pt-18',
            {
              'lg:max-w-[50rem] [&_[data-section-container-inner]]:px-0 [&_[data-section-container-inner]]:lg:px-0':
                !!sidebar,
            },
          )}
        >
          {page.showTableOfContents && <TableOfContentsSection />}
          {page.subnavigation ? <SubnavigationSection section={page.subnavigation} /> : null}
          <Sections sections={filteredSections} />
          <RelatedArticlesSection page={page} />
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
