/* eslint-disable @typescript-eslint/no-shadow */
/* eslint-disable unicorn/consistent-destructuring */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { client } from '@utils/gql'
import { buildMockData } from '@utils/homepage-mockdata'
import { parseMainMenu } from '@utils/page'
import { AsyncServerProps } from '@utils/types'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useRef } from 'backend/react'

import HomepagePage from '../components/layouts/HomepagePage'
import PageWrapper from '../components/layouts/PageWrapper'

export const getStaticProps = async (ctx: { locale: string }) => {
  const locale: string = ctx.locale ?? 'sk'

  const { blogPosts } = await client.LatestBlogsWithTags({
    limit: 5,
    sort: 'publishedAt:desc',
    locale,
  })

  const { homepage } = await client.Homepage({
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
    revalidate: 30,
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
  rozkoPosts,
}: AsyncServerProps<typeof getStaticProps>) => {
  // Commented below line for reference.
  // const { pageTitle, pageSubtitle, blogCardPosts, posts, bookmarks } = data
  const { pageTitle, posts } = data

  const menuItems = parseMainMenu(mainMenu)
  const homepageRef = useRef(null)

  return (
    <PageWrapper locale={page.locale} localizations={page.localizations} slug="" ref={homepageRef}>
      <div ref={homepageRef}>
        <HomepagePage
          homepageRef={homepageRef}
          menuItems={menuItems}
          bookmarks={cards}
          homepagePosts={homepagePosts}
          homepage={homepage}
          data={data}
          inBaProps={inba}
          posts={posts}
          rozkoPosts={rozkoPosts}
          pageTitle={pageTitle}
          latestBlogposts={latestBlogposts}
          header={header}
          footer={footer}
        />
      </div>
    </PageWrapper>
  )
}

export default Homepage
