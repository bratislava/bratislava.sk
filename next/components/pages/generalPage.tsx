// @ts-strict-ignore
/* eslint-disable no-case-declarations */
/* eslint-disable default-case */
/* eslint-disable react/no-danger */
/* eslint-disable consistent-return */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  Button,
  FeaturedBlogs,
  FooterProps,
  PageHeader,
  SectionContainer,
  SubpageList,
} from '@bratislava/ui-bratislava'
import { pageStyle, parsePageLink } from '@utils/page'
import { isPresent } from '@utils/utils'
import cx from 'classnames'
import Head from 'next/head'
import * as React from 'react'

import BasePageLayout from '../layouts/BasePageLayout'
import PageBreadcrumbs from '../molecules/PageBreadcrumbs'
import Sections from '../molecules/Sections'
import { MenuMainItem } from '@bratislava/ui-bratislava/HomepageMenu/types'

export interface GeneralPageProps {
  pages: GeneralPageFragment
  footer: FooterProps
  menuItems?: MenuMainItem[]
}

const GeneralPage = ({ pages, footer, menuItems }: GeneralPageProps) => {
  const page = pages?.data?.[0]?.attributes
  const { Link: UILink } = useUIContext()
  const hasFeaturedBlogs = page?.pageHeaderSections?.some(
    (section) => section?.__typename === 'ComponentSectionsFeaturedBlogPosts'
  )
  return (
    <BasePageLayout footer={footer} menuItems={menuItems} pageColor={page?.pageColor}>
      {page?.pageCategory?.data?.attributes?.color && (
        <style
          dangerouslySetInnerHTML={{
            __html: pageStyle(page?.pageCategory.data.attributes.color),
          }}
        />
      )}
      {/* Header */}
      <PageHeader
        className={cx('bg-cover', { 'mb-30 md:mb-16 bg-cover lg:mb-64': hasFeaturedBlogs })}
        color="var(--secondary-color)"
        transparentColor="var(--secondary-color--transparent)"
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
          <div className="relative lg:min-h-[220px]">
            <div className="absolute top-4 lg:top-6">
              <PageBreadcrumbs
                parentPage={page?.parentPage}
                pageCategory={page?.pageCategory}
                title={page?.title ?? ''}
              />
            </div>
            <h1 className="text-h1 mb-10 max-w-[730px] whitespace-pre-wrap pt-20 lg:pt-30">
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

            {/* Header Sections - Subpages */}
            {page?.pageHeaderSections?.filter(isPresent).map((section, index): JSX.Element | undefined => {
              if (section.__typename === 'ComponentSectionsSubpageList') {
                return (
                  <SubpageList
                    className="mt-10"
                    key={index}
                    subpageList={section.subpageList?.map(parsePageLink).filter(isPresent)}
                  />
                )
              }

              if (section.__typename === 'ComponentSectionsFeaturedBlogPosts') {
                const { first_blog, second_blog, third_blog } = section
                const blogs = [first_blog, second_blog, third_blog]
                return (
                  <div
                    key={index}
                    className="-bottom-45 absolute -inset-x-7.5 z-10 w-screen overflow-hidden lg:inset-x-0 lg:-bottom-87 lg:w-full"
                  >
                    <FeaturedBlogs blogs={blogs} />
                  </div>
                )
              }
            })}

            {/* Padding bottom from waves for header sections and button */}
            {hasFeaturedBlogs && <div className="pb-10 lg:pb-25" />}
            {/* {(page?.pageButtonContent?.title ||
              page?.pageButtonContent?.url ||
              page?.pageHeaderSections) && <div className="pb-14" />} */}
          </div>
        </SectionContainer>
      </PageHeader>

      {/* Page - Common Sections */}
      {page?.sections && <Sections sections={page.sections} slug={page.slug ?? ''} locale={page.locale ?? ''} />}

      {/* Page - Related Content */}
      {/* TODO: this needs a revisit as relatedBlogPosts changed to related  */}
      {/* {page?.relatedBlogPosts?.length > 0 && (
        <SectionContainer className="pt-14 md:pt-18">
          <h2 className="flex justify-center text-h3">{t('relatedContentTitle')}</h2>
          <RelatedBlogPosts page={page} />
        </SectionContainer>
      )} */}
    </BasePageLayout>
  )
}

export default GeneralPage
