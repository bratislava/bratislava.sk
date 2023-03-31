import {
  BlogCards,
  Bookmarks,
  InBaCard,
  Posts,
  PrimatorCouncil,
  SectionContainer,
  TopNine,
  Waves,
} from '@bratislava/ui-bratislava'
import { TopNineItemProps } from '@bratislava/ui-bratislava/TopNineItem/TopNineItem'
import { WelcomeHomepageSection } from '@components/molecules/sections/homepage/WelcomeHomepageSection'
import { GeneralContextProvider } from '@utils/generalContext'
import { client } from '@utils/gql'
import { buildMockData } from '@utils/homepage-mockdata'
import { AsyncServerProps } from '@utils/types'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React from 'react'

import PageContextProvider from '../components/layouts/PageContextProvider'
import PageLayout from '../components/layouts/PageLayout'
import GooutEventsHomepageSection from '../components/molecules/sections/homepage/GooutEventsHomepageSection'

export const getStaticProps = async (ctx: { locale: string }) => {
  const locale: string = ctx.locale ?? 'sk'

  const { blogPosts } = await client.LatestBlogsWithTags({
    limit: 5,
    sort: 'publishedAt:desc',
    locale,
  })

  const general = await client.General({ locale })

  const { homepage } = await client.Homepage({ locale })

  const homepagePosts = homepage?.data?.attributes?.posts?.map((post) => ({
    title: post?.title,
    url: post?.slug,
    imageSrc: post?.image?.data?.attributes?.url,
  }))

  const getRozkoPosts = async () => {
    const { blogPosts } = await client.LatestBlogsWithTags({
      limit: 7,
      sort: 'publishedAt:desc',
      filters: {
        tag: {
          title: {
            eq: 'Rozkopávky a uzávierky',
          },
        },
      },
      locale,
    })
    return blogPosts
  }

  let rozkoPosts
  try {
    rozkoPosts = await getRozkoPosts()
  } catch (error) {
    console.log(error)
  }

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
      general,
      latestBlogposts: blogPosts,
      homepage,
      page: {
        locale: ctx.locale,
        localizations: ['sk', 'en']
          .filter((l) => l !== ctx.locale)
          .map((l) => ({
            slug: '',
            locale: l,
          })),
      },
      homepagePosts,
      inba,
      header,
      cards,
      rozkoPosts,
      ...(await serverSideTranslations(locale, ['common', 'footer'])),
    },
    revalidate: 10,
  }
}

const Homepage = ({
  general,
  data,
  page,
  homepage,
  latestBlogposts,
  homepagePosts,
  cards,
  header,
  inba,
  rozkoPosts,
}: AsyncServerProps<typeof getStaticProps>) => {
  const { t } = useTranslation('common')

  const { posts } = data

  // TODO: Change Image to img when Image handling changed

  return (
    <GeneralContextProvider general={general}>
      <PageContextProvider localizations={page.localizations} slug="">
        <PageLayout>
          {/* <PageHeader color="" transparentColor="" imageSrc=""> */}
          <Head>
            <title>{homepage?.data?.attributes?.title}</title>
            <meta
              name="description"
              content={homepage?.data?.attributes?.metaDescription ?? undefined}
            />
          </Head>
          {/* </PageHeader> */}
        </PageLayout>
      </PageContextProvider>
    </GeneralContextProvider>
  )
}

export default Homepage
