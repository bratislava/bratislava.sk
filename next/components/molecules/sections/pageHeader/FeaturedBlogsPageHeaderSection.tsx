import { FeaturedBlogPostsPageHeaderSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { FeaturedBlogs } from '@bratislava/ui-bratislava/FeaturedBlogs/FeaturedBlogs'
import { isDefined } from '@utils/isDefined'
import React from 'react'

type FeaturedBlogsPageHeaderSectionProps = {
  section: FeaturedBlogPostsPageHeaderSectionFragment
}

const FeaturedBlogsPageHeaderSection = ({ section }: FeaturedBlogsPageHeaderSectionProps) => {
  const { first_blog, second_blog, third_blog } = section
  const blogPosts = [first_blog?.data, second_blog?.data, third_blog?.data].filter(isDefined)

  return (
    <div className="relative">
      <FeaturedBlogs blogPosts={blogPosts} />
    </div>
  )
}

export default FeaturedBlogsPageHeaderSection
