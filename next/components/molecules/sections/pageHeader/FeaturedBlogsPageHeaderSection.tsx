import { FeaturedBlogPostsPageHeaderSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { FeaturedBlogs } from '@bratislava/ui-bratislava/FeaturedBlogs/FeaturedBlogs'
import { isPresent } from '@utils/utils'
import React from 'react'

type FeaturedBlogsPageHeaderSectionProps = {
  section: FeaturedBlogPostsPageHeaderSectionFragment
}

const FeaturedBlogsPageHeaderSection = ({ section }: FeaturedBlogsPageHeaderSectionProps) => {
  const { first_blog, second_blog, third_blog } = section
  const blogs = [first_blog, second_blog, third_blog].filter(isPresent)

  return (
    <div className="relative">
      <div className="h-14 w-full" />
      {/* Blogs move upwards on hover, therefore "-top-3 pt-3" makes a space to not be cut b overflow. */}
      <div className="absolute -top-3 z-10 w-screen overflow-hidden pt-3 lg:w-full">
        <FeaturedBlogs blogs={blogs} />
      </div>
    </div>
  )
}

export default FeaturedBlogsPageHeaderSection
