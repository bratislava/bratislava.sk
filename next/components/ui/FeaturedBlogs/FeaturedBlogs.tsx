import { BlogSearchCard } from '../BlogSearchCard/BlogSearchCard'
import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { BlogSectionFragment } from '@bratislava/strapi-sdk-homepage'

export interface BlogItem {
  data?: {
    attributes?: {
      coverImage?: {
        data?: {
          attributes?: {
            url?: string
          }
        }
      }
      publishedAt?: string
      slug?: string
      tag?: {
        data?: {
          attributes?: {
            pageCategory?: {
              data?: {
                attributes?: {
                  color?: string
                  shortTitle?: string
                }
              }
            }
          }
        }
      }
      title?: string
    }
  }
}

export interface FeaturedBlogsProps {
  blogs?: BlogSectionFragment[]
}

export const FeaturedBlogs = ({ blogs }: FeaturedBlogsProps) => {
  return (
    <>
      <div className="hidden lg:flex gap-x-8">
        <div className="w-1/2">
          <BlogSearchCard fullCardSizeImage className="h-full w-full" item={blogs[0]} />
        </div>
        <div className="flex flex-col gap-y-8 w-1/2">
          {blogs.slice(1, 3).map((blog, index) => (
            <BlogSearchCard key={index} className="h-52" imageClassName="w-[206px]" item={blog} />
          ))}
        </div>
      </div>
      <HorizontalScrollWrapper className="lg:hidden gap-x-4">
        {blogs.map((blog, index) => {
          return (
            <BlogSearchCard key={index} className="w-74 h-60 flex-shrink-0" imageClassName="w-[206px]" item={blog} />
          )
        })}
      </HorizontalScrollWrapper>
    </>
  )
}
