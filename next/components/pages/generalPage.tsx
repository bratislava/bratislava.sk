import { ArrowRight, ChevronRight } from '@assets/images'
import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { Enum_Pagecategory_Color, GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  Button,
  FeaturedBlogs,
  FooterProps,
  MenuMainItem,
  PageHeader,
  SectionContainer,
  SubpageList,
} from '@bratislava/ui-bratislava'
import cx from 'classnames'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import * as React from 'react'

import { pageStyle, parsePageLink } from '../../utils/page'
import { isPresent } from '../../utils/utils'
import BasePageLayout from '../layouts/BasePageLayout'
import PageBreadcrumbs from '../molecules/PageBreadcrumbs'
import Sections from '../molecules/Sections'
import RelatedBlogPosts from '../molecules/sections/homepage/RelatedBlogPosts'

export interface GeneralPageProps {
  pages: GeneralPageFragment
  footer: FooterProps
  children?: React.ReactNode
  menuItems?: MenuMainItem[]
}

const renderColor = (color: any) => {
  if (color === 'blue') {
    return Enum_Pagecategory_Color.Blue
  }
  if (color === 'brown') {
    return Enum_Pagecategory_Color.Brown
  }
  if (color === 'green') {
    return Enum_Pagecategory_Color.Green
  }
  if (color === 'purple') {
    return Enum_Pagecategory_Color.Purple
  }
  if (color === 'yellow') {
    return Enum_Pagecategory_Color.Yellow
  }
}
const GeneralPage = ({ pages, footer, children, menuItems }: GeneralPageProps) => {
  const page = pages?.data?.[0]?.attributes
  const { Link: UILink } = useUIContext()
  const { t } = useTranslation('common')
  const hasFeaturedBlogs = page?.pageHeaderSections?.some(
    (section) => section.__typename === 'ComponentSectionsFeaturedBlogPosts'
  )
  return (
    <BasePageLayout footer={footer} menuItems={menuItems} activeMenuItem={page?.pageCategory?.data?.id}>
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
          <div className="relative min-h-[280px] lg:min-h-[220px]">
            <div className="absolute top-6">
              <PageBreadcrumbs parentPage={page?.parentPage} pageCategory={page?.pageCategory} title={page.title} />
            </div>
            <h1 className="mb-10 max-w-[730px] whitespace-pre-wrap pt-30 text-md font-bold md:text-2xl">
              {page?.title}
            </h1>

            {/* Header - PageLink as Button */}
            {page?.pageButtonContent && page?.pageButtonContent.title && (
              <Button
                className="base-button my-10 space-x-6 rounded-lg py-3 px-6 text-default"
                icon={<ChevronRight />}
                hoverIcon={<ArrowRight />}
              >
                <UILink href={page?.pageButtonContent?.url ?? ''}>
                  <span>{page?.pageButtonContent?.title ?? ''}</span>
                </UILink>
              </Button>
            )}

            {/* Header Sections - Subpages */}
            {page?.pageHeaderSections?.filter(isPresent).map((section, index) => {
              switch (section.__typename) {
                case 'ComponentSectionsSubpageList':
                  return (
                    <SubpageList
                      pageColor={renderColor(page.pageColor)}
                      className="mt-10"
                      key={index}
                      subpageList={section.subpageList?.map(parsePageLink).filter(isPresent)}
                    />
                  )

                case 'ComponentSectionsFeaturedBlogPosts':
                  const { first_blog, second_blog, third_blog } = section
                  const blogs = [first_blog, second_blog, third_blog]
                  return (
                    <div key={index} className="absolute -bottom-45 z-10 w-full overflow-hidden lg:-bottom-87">
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
      {page?.sections && <Sections sections={page.sections} slug={page.slug} locale={page.locale} />}

      {/* Page - Related Content */}
      {/* TODO: this needs a revisit as relatedBlogPosts changed to related  */}
      {/* {page?.relatedBlogPosts?.length > 0 && (
        <SectionContainer className="pt-14 md:pt-18">
          <h2 className="flex justify-center font-semibold text-lg">{t('relatedContentTitle')}</h2>
          <RelatedBlogPosts page={page} />
        </SectionContainer>
      )} */}
    </BasePageLayout>
  )
}

export default GeneralPage
