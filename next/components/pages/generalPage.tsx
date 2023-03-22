// @ts-strict-ignore
/* eslint-disable array-callback-return */
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  Button,
  FooterProps,
  MenuMainItem,
  PageHeader,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import { MenuItem } from '@bratislava/ui-bratislava/NavMenu/navMenuTypes'
import { pagePath, pageStyle } from '@utils/page'
// import { pagePath, pageStyle, parsePageLink } from '@utils/page'
import { isProductionDeployment } from '@utils/utils'
import cx from 'classnames'
import dynamic from 'next/dynamic'
import Head from 'next/head'
import * as React from 'react'
import { useIsClient } from 'usehooks-ts'

import BasePageLayout from '../layouts/BasePageLayout'
import PageBreadcrumbs from '../molecules/PageBreadcrumbs'
import PageHeaderSections from '../molecules/PageHeaderSections'
import Sections from '../molecules/Sections'

// import RelatedBlogPosts from '../molecules/sections/homepage/RelatedBlogPosts'

// error with 'window' is not defined, that's beacause server side rendering + (ReactWebChat + DirectLine)
// https://github.com/microsoft/BotFramework-WebChat/issues/4607
const DynamicChat = dynamic(() => import('../molecules/chat'), {
  ssr: false,
})

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
  const crumbs: { title: string; url: string | null }[] = []
  if (page?.parentPage.data) {
    crumbs.push({
      title: page?.parentPage.data?.attributes?.title ?? '',
      url: pagePath({
        locale: page?.parentPage?.data?.attributes?.locale,
        slug: page?.parentPage?.data?.attributes?.slug,
      }),
    })
  } else if (page?.pageCategory) {
    crumbs.push({ title: page?.pageCategory?.data?.attributes?.title ?? '', url: null })
  }

  crumbs.push({ title: page.title ?? '', url: null })

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
        className={cx('bg-cover', { 'mb-32 md:mb-16 bg-cover lg:mb-64': hasFeaturedBlogs })}
        color="var(--category-color-200)"
        transparentColor="var(--category-color-200--transparent)"
        imageSrc={page?.pageBackgroundImage?.data?.attributes?.url || ''}
      >
        {/* meta discription */}
        {page?.metaDiscription && page?.title && (
          <Head>
            <title> {page?.title} </title>
            <meta name="description" content={page?.metaDiscription} />
          </Head>
        )}
        {/* Header - Breadcrumbs */}
        <SectionContainer>
          <div className="lg:min-h-56 relative">
            <div className="absolute top-4 lg:top-6">
              <PageBreadcrumbs crumbs={crumbs} />
            </div>
            <h1 className="text-h1 max-w-[730px] mb-10 whitespace-pre-wrap pt-20 lg:pt-32">
              {page?.title}
            </h1>

            {/* Header - PageLink as Button */}
            {page?.pageButtonContent && page?.pageButtonContent.title && (
              <Button
                className="base-button text-p1 my-10 space-x-6 rounded-lg py-3 px-6"
                icon={<ChevronRight />}
                hoverIcon={<ArrowRight />}
              >
                <UILink href={page?.pageButtonContent?.url ?? ''}>
                  <span>{page?.pageButtonContent?.title ?? ''}</span>
                </UILink>
              </Button>
            )}

            <PageHeaderSections sections={page?.pageHeaderSections} />

            {/* Padding bottom from waves for header sections and button */}
            {hasFeaturedBlogs && <div className="pb-10 lg:pb-24" />}
            {/* {(page?.pageButtonContent?.title ||
              page?.pageButtonContent?.url ||
              page?.pageHeaderSections) && <div className="pb-14" />} */}
          </div>
        </SectionContainer>
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
  )
}

export default GeneralPage
