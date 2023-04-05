import { PageEntityFragment } from '@bratislava/strapi-sdk-homepage'
import { Breadcrumb } from '@bratislava/ui-bratislava/Breadcrumbs/Breadcrumbs'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import { isDefined } from '@utils/isDefined'
import { isProductionDeployment } from '@utils/utils'
import dynamic from 'next/dynamic'
import * as React from 'react'
import { useMemo } from 'react'
import { useIsClient } from 'usehooks-ts'

import PageHeaderSections from '../molecules/PageHeaderSections'
import Sections from '../molecules/Sections'

// error with 'window' is not defined, that's because server side rendering + (ReactWebChat + DirectLine)
// https://github.com/microsoft/BotFramework-WebChat/issues/4607
const DynamicChat = dynamic(() => import('../molecules/chat'), {
  ssr: false,
})

// TODO: Replace with Navikronos.
const getBreadcrumbs = (page: PageEntityFragment) => {
  const current = page
  if (!current) {
    return [] as Breadcrumb[]
  }
  let parentPage = current?.attributes?.parentPage
  const breadcrumbs: Breadcrumb[] = [
    {
      title: current?.attributes?.title ?? '',
      path: null,
    },
  ]
  while (parentPage?.data?.attributes) {
    breadcrumbs.push({
      title: parentPage?.data?.attributes?.title ?? '',
      path: parentPage?.data?.attributes?.slug ?? null,
    })
    parentPage = parentPage?.data?.attributes?.parentPage
  }

  if (current?.attributes?.pageCategory?.data?.attributes?.title) {
    breadcrumbs.push({
      title: current?.attributes?.pageCategory?.data?.attributes?.title,
      path: null,
    })
  }

  return breadcrumbs.reverse()
}

export interface GeneralPageProps {
  page: PageEntityFragment
}

const GeneralPageContent = ({ page }: GeneralPageProps) => {
  const pageId = page.id

  const hasFeaturedBlogs = page.attributes?.pageHeaderSections
    ?.filter(isDefined)
    .some((section) => section.__typename === 'ComponentSectionsFeaturedBlogPosts')
  const breadcrumbs = useMemo(() => getBreadcrumbs(page), [page])

  const isClient = useIsClient()

  // TODO: Refactor
  const shouldDisplayUkraineSupportChat =
    isProductionDeployment() &&
    isClient &&
    (pageId === '611' || // /bratislava-pre-ukrainu
      pageId === '612' || // /братислава-для-украiни
      pageId === '635' || // /en/bratislava-for-ukraine
      pageId === '636' || // /en/братислава-для-украiни
      page.attributes?.parentPage?.data?.attributes?.slug === 'bratislava-pre-ukrajinu' || // /bratislava-pre-ukrajinu/...
      page.attributes?.parentPage?.data?.attributes?.slug === 'братислава-для-украiни') // /братислава-для-украiни/... || /en/братислава-для-украiни... because parent page slug is same for all languages

  return (
    <>
      {/* Header */}
      <PageHeader
        title={page.attributes?.title}
        subtext={page.attributes?.subtext}
        breadcrumbs={breadcrumbs}
        buttons={page.attributes?.headerLinks?.filter(isDefined)}
        className={hasFeaturedBlogs ? 'mb-[110px] lg:mb-[266px]' : null}
        imageSrc={page.attributes?.pageBackgroundImage?.data?.attributes?.url}
      >
        <PageHeaderSections sections={page.attributes?.pageHeaderSections} />
      </PageHeader>

      {/* Page - Common Sections */}
      <div className="mb-8">
        {page.attributes?.sections && <Sections sections={page.attributes.sections} />}
      </div>

      {shouldDisplayUkraineSupportChat && <DynamicChat />}
    </>
  )
}

export default GeneralPageContent
