import { BlogCards, Posts, PrimatorCouncil, SectionContainer } from '@components/ui'
import { buildMockData } from '@utils/homepage-mockdata'
import { useHomepageContext } from '@utils/homepageContext'
import React from 'react'

const BlogCardsPrimatorHomepageSection = () => {
  const { homepage, blogPosts, rozkopavkyBlogPosts } = useHomepageContext()

  const homepagePosts = homepage?.attributes?.posts?.map((post) => ({
    title: post?.title,
    url: post?.slug,
    imageSrc: post?.image?.data?.attributes?.url,
  }))

  const { posts } = buildMockData({
    inBaImage1: '/inba1.jpeg',
    inBaImage2: '/inba2.png',
    postImage1: '/sample-blog-image.png',
    postImage2: '/sample-news-image.jpeg',
    postImage3: '/viz2-1024x690.jpeg',
    newsImage1: '/sample-news-image.jpeg',
    newsImage2: '/sample-news-image-2.jpeg',
    primatorImage: '/primatorReal.png',
    councilImage: '/BACoatOfArms.svg',
    locale: 'sk',
  })

  return (
    <SectionContainer className="bg-gray-50 pb-14">
      <BlogCards className="mb-0 lg:mb-8" posts={homepagePosts} shiftIndex={1} />
      <Posts
        readMoreText={t('readMore')}
        readMoreNewsText={t('seeAllNews')}
        className="lg:mt-10"
        leftHighLight={homepage?.attributes?.left_highlight}
        rightHighLight={homepage?.attributes?.right_highlight}
        posts={posts}
        latestPost={blogPosts}
        rozkoPosts={rozkopavkyBlogPosts}
      />

      <PrimatorCouncil className="mt-14 lg:mt-20" primatorCards={data.council.cards} />
    </SectionContainer>
  )
}

export default BlogCardsPrimatorHomepageSection
