import {
  BlogCards,
  InBaCard,
  PageHeader,
  Posts,
  PrimatorCouncil,
  SectionContainer,
  TopNine,
  Waves,
} from '@bratislava/ui-bratislava'
import { MenuItem } from '@bratislava/ui-bratislava/NavMenu/NavMenu'
import { TopNineItemProps } from '@bratislava/ui-bratislava/TopNineItem/TopNineItem'
import { client } from '@utils/gql'
import { buildMockData } from '@utils/homepage-mockdata'
import { isDefined } from '@utils/isDefined'
import { parseFooter, parseMainMenu } from '@utils/page'
import { AsyncServerProps } from '@utils/types'
import Head from 'next/head'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useMemo } from 'react'

import HomepagePageLayout from '../components/layouts/HomepagePageLayout'
import PageWrapper from '../components/layouts/PageWrapper'
import FacebookPostsHomepageSection from '../components/molecules/sections/homepage/FacebookPostsHomepageSection'
import GooutEventsHomepageSection from '../components/molecules/sections/homepage/GooutEventsHomepageSection'

export const getStaticProps = async (ctx: { locale: string }) => {
  const locale: string = ctx.locale ?? 'sk'

  const { blogPosts } = await client.LatestBlogsWithTags({
    limit: 5,
    sort: 'publishedAt:desc',
    locale,
  })

  const { homepage } = await client.Homepage({ locale })

  const { pageCategories: mainMenu } = await client.MainMenu({ locale })

  const { menu } = await client.Menu({ locale })

  const { footer } = await client.Footer({ locale })

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
      footer,
      latestBlogposts: blogPosts,
      homepage,
      mainMenu,
      menu,
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
  data,
  footer,
  mainMenu,
  menu,
  page,
  homepage,
  latestBlogposts,
  homepagePosts,
  cards,
  header,
  inba,
  rozkoPosts,
}: AsyncServerProps<typeof getStaticProps>) => {
  const { posts } = data

  const menuItemsOld = mainMenu ? parseMainMenu(mainMenu) : []

  const menusParsed: MenuItem[] = useMemo(() => {
    return (
      menu?.data?.attributes?.menus
        ?.map((menuItem) => {
          if (!menuItem?.page?.data?.attributes?.slug) return null

          const { label, icon } = menuItem
          const linkHref = menuItem.page.data.attributes.slug
          const items =
            // eslint-disable-next-line unicorn/consistent-destructuring
            menuItem.sections
              ?.map((section) => {
                if (!section) return null

                const sectionLabel = section.label

                const sectionItems =
                  section.links
                    ?.map((menuLink) => {
                      if (!menuLink?.page?.data?.attributes?.slug) return null

                      return {
                        label: menuLink.label,
                        url: menuLink.page.data.attributes.slug,
                      }
                    })
                    .filter(isDefined) ?? []

                return {
                  label: sectionLabel,
                  items: sectionItems,
                  colSpan: 1,
                }
              })
              .filter(isDefined) ?? []

          return { label, items, colCount: 3, linkHref, icon }
        })
        .filter(isDefined) ?? []
    )
  }, [menu])

  const { t } = useTranslation('common')
  // TODO: Change Image to img when Image handling changed

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations} slug="">
      <HomepagePageLayout
        header={header}
        menuItemsOld={menuItemsOld}
        menus={menusParsed}
        footer={(footer && parseFooter(footer?.data?.attributes)) ?? undefined}
        bookmarks={cards}
      >
        <PageHeader
          color=""
          transparentColor=""
          imageSrc=""
          waves={{
            className: 'md:mt-18 mt-6',
            waveColor: 'white',
            wavePosition: 'bottom',
            backgroundColor: 'var(--background-color)',
          }}
        >
          <Head>
            <title>{homepage?.data?.attributes?.title}</title>
            <meta
              name="description"
              content={homepage?.data?.attributes?.metaDescription ?? undefined}
            />
          </Head>
        </PageHeader>

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
        <Waves
          className="mt-[-1px] lg:mt-0"
          backgroundColor="white"
          wavePosition="bottom"
          isRich
          waveColor="var(--background-color)"
        />
        <SectionContainer>
          <GooutEventsHomepageSection
            linkTitle={t('allEvents')}
            linkUrl="https://www.bkis.sk/podujatia/"
            title={t('upComingEvents')}
            className="mt-14"
          />
        </SectionContainer>

        <Waves
          className="mb-[-1px] lg:mb-0"
          waveColor="var(--category-color-200)"
          wavePosition="top"
          isRich
        />

        <SectionContainer className="bg-category-200 relative py-8">
          <h2 className="text-h1 xs:mt-8 pb-10 text-center lg:pb-20">{data.topNineTitle}</h2>
          <TopNine items={data.topNine as TopNineItemProps[]} />
        </SectionContainer>
        <Waves
          waveColor="var(--category-color-200)"
          wavePosition="bottom"
          isRich
          className="mt-[-1px] lg:mt-0"
        />

        <SectionContainer>
          <InBaCard className="mx-auto mt-40 md:mt-28 min-h-[200px] max-w-3xl" {...inba} />
          <div className="hidden md:block md:h-20" />

          <FacebookPostsHomepageSection title="Bratislava na Facebooku" />
          {/* TODO : commented newsletter for this release probabbly on future release we will uncomment */}
          {/* <NewsLetterSection className="mt-24" /> */}
        </SectionContainer>
      </HomepagePageLayout>
    </PageWrapper>
  )
}

export default Homepage
