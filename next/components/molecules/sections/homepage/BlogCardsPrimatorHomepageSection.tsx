import SectionContainer from '@components/ui/SectionContainer/SectionContainer'
import BlogCards from '@components/ui/Sections/BlogCards/BlogCards'
import HomepageTabs from '@components/ui/Sections/HomepageTabs/HomepageTabs'
import PrimatorCouncil from '@components/ui/Sections/PrimatorCouncil/PrimatorCouncil'
import { useHomepageContext } from '@utils/homepageContext'
import { isDefined } from '@utils/isDefined'
import React from 'react'

const BlogCardsPrimatorHomepageSection = () => {
  const { homepage } = useHomepageContext()

  const homepagePosts = homepage?.attributes?.posts?.filter(isDefined) ?? []

  return (
    <SectionContainer className="bg-gray-50 pb-14 md:px-8">
      <BlogCards posts={homepagePosts} />
      <HomepageTabs className="lg:mt-10" />
      <PrimatorCouncil className="mt-14 lg:mt-20" />
    </SectionContainer>
  )
}

export default BlogCardsPrimatorHomepageSection
