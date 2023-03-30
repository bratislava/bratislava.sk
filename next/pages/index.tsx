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
import { WelcomeSection } from '../components/molecules/sections/general/WelcomeSection'
import FacebookPostsHomepageSection from '../components/molecules/sections/homepage/FacebookPostsHomepageSection'
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
          <Bookmarks bookmarks={cards} className="top-56" />

          <WelcomeSection homepageHeader={header} />

          <Waves waveColor="var(--background-color)" wavePosition="top" />

          <SectionContainer className="bg-gray-50 pb-14">
            <BlogCards className="mb-0 lg:mb-8" posts={homepagePosts} shiftIndex={1} />
            <Posts
              readMoreText={t('readMore')}
              readMoreNewsText={t('seeAllNews')}
              className="lg:mt-10"
              leftHighLight={homepage?.data?.attributes?.left_highlight}
              rightHighLight={homepage?.data?.attributes?.right_highlight}
              posts={posts}
              latestPost={latestBlogposts}
              rozkoPosts={rozkoPosts}
            />

            <PrimatorCouncil className="mt-14 lg:mt-20" primatorCards={data.council.cards} />
          </SectionContainer>
          <Waves wavePosition="bottom" waveColor="var(--background-color)" />
          <SectionContainer>
            <GooutEventsHomepageSection
              linkTitle={t('allEvents')}
              linkUrl="https://www.bkis.sk/podujatia/"
              title={t('upComingEvents')}
              className="mt-14"
            />
          </SectionContainer>

          <Waves waveColor="var(--category-color-200)" wavePosition="top" />

          <SectionContainer className="relative bg-category-200 py-8">
            <h2 className="text-h1 pb-10 text-center xs:mt-8 lg:pb-20">{data.topNineTitle}</h2>
            <TopNine items={data.topNine as TopNineItemProps[]} />
          </SectionContainer>

          <Waves waveColor="var(--category-color-200)" wavePosition="bottom" />

          <SectionContainer>
            <InBaCard className="mx-auto mt-40 min-h-[200px] max-w-3xl md:mt-28" {...inba} />
            <div className="hidden md:block md:h-20" />

            <FacebookPostsHomepageSection title="Bratislava na Facebooku" />
            {/* TODO : commented newsletter for this release probabbly on future release we will uncomment */}
            {/* <NewsLetterSection className="mt-24" /> */}
          </SectionContainer>
        </PageLayout>
      </PageContextProvider>
    </GeneralContextProvider>
  )
}

export default Homepage
