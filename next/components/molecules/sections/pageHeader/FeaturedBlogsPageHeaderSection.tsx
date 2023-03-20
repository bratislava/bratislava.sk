import { FeaturedBlogPostsPageHeaderSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { FeaturedBlogs } from '@bratislava/ui-bratislava'
import { isPresent } from '@utils/utils'
import React from 'react'

type FeaturedBlogsPageHeaderSectionProps = {
  section: FeaturedBlogPostsPageHeaderSectionFragment
}

const FeaturedBlogsPageHeaderSection = ({ section }: FeaturedBlogsPageHeaderSectionProps) => {
  const { first_blog, second_blog, third_blog } = section
  const blogs = [first_blog, second_blog, third_blog].filter(isPresent)

  return (
    <div className="-bottom-45 absolute -inset-x-8 z-10 w-screen overflow-hidden lg:inset-x-0 lg:-bottom-88 lg:w-full">
      <FeaturedBlogs blogs={blogs} />
    </div>
  )
}

export default FeaturedBlogsPageHeaderSection
