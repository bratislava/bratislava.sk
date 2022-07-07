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
      <div className="text-default font-semibold lg:text-md">{title}</div>
      <div className="hidden flex-col gap-y-6 lg:flex">
        {blogs.map((blog, index) => {
          return <BlogSearchCard key={index} item={blog} className="h-48" imageClassName="w-56 h-48" />
        })}
      </div>
      <HorizontalScrollWrapper className="gap-x-4 lg:hidden">
        {blogs.map((blog, index) => {
          return <BlogSearchCard key={index} item={blog} className="h-60 w-74 shrink-0" />
        })}
      </HorizontalScrollWrapper>
    </div>
  )
}
