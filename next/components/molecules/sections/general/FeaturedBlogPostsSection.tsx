import React from 'react'

import FeaturedBlogPosts from '@/components/ui/FeaturedBlogPosts/FeaturedBlogPosts'
import { FeaturedBlogPostsSectionFragment } from '@/services/graphql'
import { isDefined } from '@/utils/isDefined'

type FeaturedBlogPostsSectionProps = {
  section: FeaturedBlogPostsSectionFragment
}

const FeaturedBlogPostsSection = ({ section }: FeaturedBlogPostsSectionProps) => {
  const { first_blog, second_blog, third_blog } = section
  const blogPosts = [first_blog?.data, second_blog?.data, third_blog?.data].filter(isDefined)

  return (
    <div className="relative">
      <FeaturedBlogPosts blogPosts={blogPosts} />
    </div>
  )
}

export default FeaturedBlogPostsSection
