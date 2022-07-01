import { GeneralPageFragment } from '@bratislava/strapi-sdk-homepage'
import {
  AdvancedSearch,
  BlogSearchCards,
  FileList,
  Footer,
  FooterProps,
  NoResultsFound,
  PageCards,
  PageHeader,
  SearchResults,
  SectionContainer,
} from '@bratislava/ui-bratislava'
import { useTranslation } from 'next-i18next'
import BasePageLayout from '../components/layouts/BasePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import { pageStyle } from '../utils/page'
import { isPresent } from '../utils/utils'
import { AsyncServerProps } from '@utils/types'
import { client } from '@utils/gql'
import { buildMockData } from '@utils/homepage-mockdata'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { parseFooter, parseMainMenu } from '../utils/page'
import useSWR from 'swr'
import { searchFetcher } from '@utils/meili'
import { useState } from 'react'

export interface SearchPageProps {
  page?: GeneralPageFragment
  footer: FooterProps
}

export const getServerSideProps = async (ctx: any) => {
  const locale = ctx.locale ?? 'sk'
  const { footer, mainMenu } = await client.PageBySlug({
    slug: 'test',
    locale,
  })

  const { blogPosts } = await client.LatestBlogsWithTags({
    limit: 5,
    sort: 'publishedAt:desc',
  })

  const { homepage } = await client.Homepage({
    locale,
  })

  const homepagePosts = homepage?.data?.attributes?.posts?.map((post) => ({
    title: post?.title,
    url: post?.slug,
    imageSrc: post?.image?.data?.attributes?.url,
  }))

  const frontImage = homepage?.data?.attributes?.inba?.images?.frontImage?.data?.attributes?.url
  const rearImage = homepage?.data?.attributes?.inba?.images?.rearImage?.data?.attributes?.url
  const inba = {
    title: homepage?.data?.attributes?.inba?.title,
    content: homepage?.data?.attributes?.inba?.content,
    link: homepage?.data?.attributes?.inba?.link,
    images: [frontImage, rearImage],
  }

  const header = homepage?.data?.attributes?.header

  const cards = homepage?.data?.attributes?.cards?.map((card) => ({
    bookmarkTitle: card?.title,
    title: card?.headline,
    content: card?.text,
    link: {
      title: card?.link?.title,
      href: card?.link?.href,
    },
    icon: card?.picture?.data?.attributes?.url,
    variant: card?.variant,
  }))

  return {
    props: {
      data: buildMockData({
        inBaImage1: '/inba1.jpeg',
        inBaImage2: '/inba2.png',
        postImage1: '/sample-blog-image.png',
        postImage2: '/sample-news-image.jpeg',
        postImage3: '/viz2-1024x690.jpeg',
        newsImage1: '/sample-news-image.jpeg',
        newsImage2: '/sample-news-image-2.jpeg',
        primatorImage: '/primatorReal.png',
        councilImage: '/BACoatOfArms.svg',
        locale,
      }),
      footer: footer,
      latestBlogposts: blogPosts,
      homepage,
      mainMenu,
      page: {
        locale: ctx.locale,
        localizations: ['sk', 'en']
          .filter((l) => l !== ctx.locale)
          .map((l) => ({
            slug: '',
            locale: l,
          })),
      },
      homepagePosts: homepagePosts,
      inba: inba,
      header: header,
      cards: cards,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
  }
}

const Search = ({
  //data,
  footer,
  mainMenu,
  page,
  homepage,
  latestBlogposts,
  homepagePosts,
  cards,
  header,
  inba,
}: AsyncServerProps<typeof getServerSideProps>) => {
  const { t } = useTranslation('common')
  const menuItems = parseMainMenu(mainMenu)

  return (
    <PageWrapper
      locale={page.locale}
      localizations={[
        { locale: 'sk', slug: 'vyhladavanie' },
        { locale: 'en', slug: 'search' },
      ]}
      slug={'/vyhladavanie'}
    >
      <BasePageLayout footer={(footer && parseFooter(footer)) ?? undefined} menuItems={menuItems}>
        <style
          dangerouslySetInnerHTML={{
            __html: pageStyle('red'),
          }}
        />
        {/* Header */}
        <PageHeader
          color="var(--secondary-color)"
          transparentColor="var(--secondary-color--transparent)"
          imageSrc={''}
          className="header-main-bg bg-cover"
        >
          <SectionContainer>
            <div className="min-h-[220px] relative">
              <h1 className="pt-30 text-md md:text-2xl font-bold whitespace-pre-wrap">{t('searchTheSite')}</h1>
            </div>
          </SectionContainer>
        </PageHeader>
        <SectionContainer className="flex gap-y-14 lg:gap-y-24 pt-14 md:pt-18">
          <AdvancedSearch
            placeholder={t('enterKeyword')}
            title={t('searching')}
            buttonText={t('search')}
            options={[t('articles'), t('pages'), t('documents')]}
            //handleClick={handleClick}
          />
          <SearchResults />
          {/* TODO : commented newsletter for this release probabbly on future release we will uncomment */}
          {/* <NewsLetterSection /> */}
        </SectionContainer>
      </BasePageLayout>
    </PageWrapper>
  )
}

// const fileSections = [
//   {
//     category: 'Category 1',
//     files: [
//       {
//         title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
//         media: {
//           url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
//           created_at: 'máj 2021',
//           ext: '.pdf',
//           size: 1.6,
//         },
//       },
//       {
//         title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
//         media: {
//           url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
//           created_at: 'máj 2021',
//           ext: '.pdf',
//           size: 1.6,
//         },
//       },
//       {
//         title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
//         media: {
//           url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
//           created_at: 'máj 2021',
//           ext: '.pdf',
//           size: 1.6,
//         },
//       },
//       {
//         title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
//         media: {
//           url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
//           created_at: 'máj 2021',
//           ext: '.pdf',
//           size: 1.6,
//         },
//       },
//       {
//         title: 'ZaD 01 5. Ochrana prírody, tvorba krajiny a územný systém ekologickej stability',
//         media: {
//           url: 'https://www.figma.com/file/HCVqucaNmSiPW1ECKC5q6H/bratislava.sk?node-id=3528%3A45237',
//           created_at: 'máj 2021',
//           ext: '.pdf',
//           size: 1.6,
//         },
//       },
//     ],
//   },
// ]

// const blogs = [
//   {
//     data: {
//       attributes: {
//         coverImage: {
//           data: {
//             attributes: {
//               url: 'https://cdn-api.bratislava.sk/strapi-homepage/upload/44654929_1094813014012650_2908887100818456576_n_2f821d87a4.png',
//             },
//           },
//         },
//         publishedAt: '2022-04-05T14:12:11.528Z',
//         tag: {
//           data: {
//             attributes: {
//               pageCategory: {
//                 data: {
//                   attributes: {
//                     color: 'red',
//                     shortTitle: 'Mesto Bratislava',
//                   },
//                 },
//               },
//             },
//           },
//         },
//         title: 'Výsledky výberového konania na pozíciu náčelníka Mestskej polície',
//       },
//     },
//   },
// ]

// const pages = [
//   {
//     pageColor: 'red',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'blue',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'green',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'yellow',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'purple',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
//   {
//     pageColor: 'brown',
//     title: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
//   },
// ]

export default Search
