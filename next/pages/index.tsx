import {
  AdvancedAccordion,
  BlogCards,
  InBaCard,
  PageTitle,
  Posts,
  PrimatorCouncil,
  SectionContainer,
  TopNine,
  Waves,
} from '@bratislava/ui-bratislava'
import HomepageMenu from '@bratislava/ui-bratislava/HomepageMenu/HomepageMenu'
import { TopNineItemProps } from '@bratislava/ui-bratislava/TopNineItem/TopNineItem'
// import { GetServerSidePropsContext } from 'next'
// import Image from 'next/image'
import * as React from 'react'
import { useTranslation } from 'next-i18next'
import BAHero from '../assets/images/ba-hero.png'
import HomepagePageLayout from '../components/layouts/HomepagePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import FacebookPosts from '../components/molecules/sections/homepage/FacebookPosts'
import GooutEvents from '../components/molecules/sections/homepage/GooutEvents'
import NewsLetterSection from '../components/molecules/sections/NewsLetterSection'
import { client } from '../utils/gql'
import { buildMockData } from '../utils/homepage-mockdata'
import { parseFooter, parseMainMenu } from '../utils/page'
import { isPresent } from '../utils/utils'
import { AsyncServerProps } from '../utils/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'

export const getServerSideProps = async (ctx) => {
  const locale = ctx.locale ?? 'sk'

  const { blogPosts } = await client.LatestBlogsWithTags({
    limit: 5,
    sort: 'publishedAt:desc',
  })

  let { homepage } = await client.Homepage({
    locale,
  })

  const { pageCategories: mainMenu } = await client.MainMenu({
    locale,
  })

  const { footer } = await client.Footer({
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
      footer,
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

const Homepage = ({
  data,
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
  const { pageTitle, pageSubtitle, blogCardPosts, posts, bookmarks } = data

  const menuItems = parseMainMenu(mainMenu)

  const { t } = useTranslation('common')
  // TODO: Change Image to img when Image handling changed

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations} slug="">
      <HomepagePageLayout menuItems={menuItems} footer={(footer && parseFooter(footer)) ?? undefined} bookmarks={cards}>
        <div className="bg-white">
          <SectionContainer>
            <div className="pt-25 lg:pt-18 pb-10 flex flex-col sm:flex-row sm:items-center">
              <PageTitle className="flex-1" title={pageTitle} subtitle={header?.subtitle} />
              <img width={721} height={364} src={header?.picture?.data?.attributes?.url} alt="Bratislava Hero" />
            </div>
            <HomepageMenu items={menuItems} />
          </SectionContainer>
          <Waves
            className="mt-6 md:mt-18"
            waveColor="white"
            wavePosition="bottom"
            isRich
            backgroundColor="var(--background-color)"
          />
        </div>

        <SectionContainer>
          <AdvancedAccordion />
          <BlogCards posts={homepagePosts} shiftIndex={1} />
          <Posts
            readMoreText={t('readMore')}
            readMoreNewsText={t('seeAllNews')}
            className="mt-10"
            leftHighLight={homepage?.data?.attributes?.left_highlight}
            rightHighLight={homepage?.data?.attributes?.right_highlight}
            posts={posts}
            latestPost={latestBlogposts.data}
          />
          <PrimatorCouncil className="mt-24" primatorCards={data.council.cards} />

          <GooutEvents
            linkTitle={t('allEvents')}
            linkUrl={t('goOutEventsLink')}
            title={t('upComingEvents')}
            className="mt-14 lg:mt-24"
          />
        </SectionContainer>

        <Waves
          className="mt-20"
          backgroundColor="var(--background-color)"
          waveColor="var(--secondary-color)"
          wavePosition="top"
          isRich
        />

        <SectionContainer className="bg-secondary py-16">
          <h2 className="font-semibold text-default text-center lg:text-2xl lg:pb-20 pb-10">{data.topNineTitle}</h2>
          <TopNine items={data.topNine as TopNineItemProps[]} />
        </SectionContainer>
        <Waves
          waveColor="var(--secondary-color)"
          backgroundColor="var(--background-color)"
          wavePosition="bottom"
          isRich
        />

        <SectionContainer>
          <InBaCard className="max-w-3xl mx-auto min-h-[200px] mt-36" {...inba} />
          <div className="hidden md:block md:h-[78px]" />

          <FacebookPosts title="Bratislava na Facebooku" />
          {/* TODO : commented newsletter for this release probabbly on future release we will uncomment */}
          {/* <NewsLetterSection className="mt-24" /> */}
        </SectionContainer>
      </HomepagePageLayout>
    </PageWrapper>
  )
}

export default Homepage
