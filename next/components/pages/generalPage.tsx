// @ts-strict-ignore
/* eslint-disable array-callback-return */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { GeneralPageFragment, PageHeaderButtonFragment } from '@bratislava/strapi-sdk-homepage'
import { FooterProps, MenuMainItem } from '@bratislava/ui-bratislava'
import { Breadcrumb } from '@bratislava/ui-bratislava/Breadcrumbs/Breadcrumbs'
import { MenuItem } from '@bratislava/ui-bratislava/NavMenu/navMenuTypes'
import PageHeader from '@bratislava/ui-bratislava/PageHeader/PageHeader'
import { pagePath, pageStyle } from '@utils/page'
// import { pagePath, pageStyle, parsePageLink } from '@utils/page'
import { isProductionDeployment } from '@utils/utils'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import * as React from 'react'
import { useMemo } from 'react'
import { useIsClient } from 'usehooks-ts'

import BasePageLayout from '../layouts/BasePageLayout'
import PageHeaderSections from '../molecules/PageHeaderSections'
import Sections from '../molecules/Sections'

// import RelatedBlogPosts from '../molecules/sections/homepage/RelatedBlogPosts'

// error with 'window' is not defined, that's beacause server side rendering + (ReactWebChat + DirectLine)
// https://github.com/microsoft/BotFramework-WebChat/issues/4607
const DynamicChat = dynamic(() => import('../molecules/chat'), {
  ssr: false,
})

// TODO: Replace with Navikronos.
const getBreadcrumbs = (page: GeneralPageFragment) => {
  const current = page.data[0]
  if (!current) {
    return [] as Breadcrumb[]
  }
  let parentPage = current?.attributes.parentPage
  const breadcrumbs: Breadcrumb[] = [
    {
      title: current?.attributes?.title,
      path: null,
    },
  ]
  while (parentPage.data?.attributes) {
    breadcrumbs.push({
      title: parentPage.data?.attributes?.title,
      path: parentPage.data?.attributes?.slug,
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

// TODO: Remove
const parseOldButton = (button: { title?: string | null; url?: string | null }) => {
  return {
    title: button.title,
    path: button.url,
  }
}

const parseButton = (button: PageHeaderButtonFragment) => {
  // TODO: Replace with Navikronos.
  const getPath = () => {
    if (button?.page?.data) {
      return pagePath(button.page.data.attributes)
    }
    if (button?.blogPost?.data) {
      return `/blog/${button.blogPost.data.attributes.slug}`
    }
    return button.url
  }

  return {
    title: button.title,
    path: getPath(),
  }
}

export interface GeneralPageProps {
  pages: GeneralPageFragment
  footer: FooterProps
  children?: React.ReactNode
  menuItems?: MenuMainItem[]
  menus: MenuItem[]
}

const GeneralPage = ({ pages, footer, menuItems, menus }: GeneralPageProps) => {
  const page = pages?.data?.[0]?.attributes
  const pageId = pages?.data?.[0].id

  const { Link: UILink } = useUIContext()
  const hasFeaturedBlogs = page?.pageHeaderSections?.some(
    (section) => section.__typename === 'ComponentSectionsFeaturedBlogPosts',
  )
  const breadcrumbs = useMemo(() => getBreadcrumbs(pages), [pages])

  const isClient = useIsClient()

  // TODO: Refactor
  const shouldDisplayUkraineSupportChat =
    isProductionDeployment() &&
    isClient &&
    (pageId === '611' || // /bratislava-pre-ukrainu
      pageId === '612' || // /братислава-для-украiни
      pageId === '635' || // /en/bratislava-for-ukraine
      pageId === '636' || // /en/братислава-для-украiни
      page.parentPage.data?.attributes.slug === 'bratislava-pre-ukrajinu' || // /bratislava-pre-ukrajinu/...
      page.parentPage.data?.attributes.slug === 'братислава-для-украiни') // /братислава-для-украiни/... || /en/братислава-для-украiни... because parent page slug is same for all languages

  return (
    <>
      {page?.metaDiscription && page?.title && (
        <Head>
          <title>{page?.title} – Bratislava</title>
          <meta name="description" content={page?.metaDiscription} />
        </Head>
      )}
      <BasePageLayout footer={footer} menuItemsOld={menuItems} menus={menus}>
        {page?.pageCategory?.data?.attributes?.color && (
          <style
            dangerouslySetInnerHTML={{
              __html: pageStyle(page?.pageCategory.data.attributes.color),
            }}
          />
        )}
        {/* Header */}
        <PageHeader
          title={page.title}
          subtitle={page.subtitle}
          breadcrumbs={breadcrumbs}
          primaryButton={
            page?.headerPrimaryButton
              ? parseButton(page?.headerPrimaryButton)
              : // TODO: Remove
              page?.pageButtonContent
              ? parseOldButton(page?.pageButtonContent)
              : null
          }
          secondaryButton={
            page?.headerSecondaryButton ? parseButton(page?.headerSecondaryButton) : null
          }
          className={hasFeaturedBlogs && 'mb-[110px] lg:mb-[266px]'}
        >
          <PageHeaderSections sections={page?.pageHeaderSections} />
        </PageHeader>

        {/* Page - Common Sections */}
        {page?.sections && <Sections sections={page.sections} />}

        {/* Page - Related Content */}
        {/* TODO: this needs a revisit as relatedBlogPosts changed to related  */}
        {/* {page?.relatedBlogPosts?.length > 0 && (
        <SectionContainer className="pt-14 md:pt-18">
          <h2 className="flex justify-center text-h3">{t('relatedContentTitle')}</h2>
          <RelatedBlogPosts page={page} />
        </SectionContainer>
      )} */}

        {shouldDisplayUkraineSupportChat && <DynamicChat />}
      </BasePageLayout>
    </>
  )
}

export default GeneralPage
