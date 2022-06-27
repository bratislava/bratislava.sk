import { BlogSearchCard } from '../BlogSearchCard/BlogSearchCard'
import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { BlogSectionFragment } from '@bratislava/strapi-sdk-homepage'


export interface BlogItem {
  title?: string
  published_at?: string
  coverImage?: any
  tag?: any
}

export interface FeaturedBlogsProps {
  blogs?: BlogSectionFragment[]
}

export const FeaturedBlogs = ({ blogs }: FeaturedBlogsProps) => {
  return (
    <>
      <div className="hidden lg:flex gap-x-8">
        <div className="w-1/2">
          <BlogSearchCard fullCardSizeImage className="h-full w-full" {...blogs} />
        </div>
        <div className="flex flex-col gap-y-8 w-1/2">
          {blogs.slice(1, 3).map((blog, index) => (
            <BlogSearchCard key={index} className="h-52" imageClassName="w-[206px]" {...blog} />
          ))}
        </div>
      </div>
      <HorizontalScrollWrapper className="lg:hidden gap-x-4">
        {blogs.map((blogCard, index) => {
          return <BlogSearchCard key={index} {...blogCard} className="w-74 h-60 flex-shrink-0" />
        })}
      </HorizontalScrollWrapper>
    </>
  )
}
