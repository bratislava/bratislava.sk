import { BlogSearchCard } from '../BlogSearchCard/BlogSearchCard'
import { BlogItem } from '../FeaturedBlogs/FeaturedBlogs'
import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper'

export interface BlogSearchCardsProps {
  title: string
  blogs?: BlogItem[]
}

export const BlogSearchCards = ({ title, blogs }: BlogSearchCardsProps) => {
  return (
    <div className="flex flex-col gap-y-3 lg:gap-y-6">
      <div className="text-default lg:text-md font-semibold">{title}</div>
      <div className="hidden lg:flex flex-col gap-y-6">
        {blogs.map((blog, index) => {
          return <BlogSearchCard key={index} item={blog} imageClassName="w-56 h-[186px]" />
        })}
      </div>
      <HorizontalScrollWrapper className="lg:hidden gap-x-4">
        {blogs.map((blog, index) => {
          return <BlogSearchCard key={index} item={blog} className="w-74 h-60 flex-shrink-0" />
        })}
      </HorizontalScrollWrapper>
    </div>
  )
}
