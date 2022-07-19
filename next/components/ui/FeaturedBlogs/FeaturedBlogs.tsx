import { BlogSectionFragment } from '@bratislava/strapi-sdk-homepage'

import { BlogSearchCard } from '../BlogSearchCard/BlogSearchCard'
import HorizontalScrollWrapper from '../HorizontalScrollWrapper/HorizontalScrollWrapper'

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
      <div className="hidden gap-x-8 lg:flex">
        <div className="w-1/2">
          <BlogSearchCard fullCardSizeImage className="h-full w-full" item={blogs[0]} />
        </div>
        <div className="flex w-1/2 flex-col gap-y-8">
          {blogs.slice(1, 3).map((blog, index) => (
            <BlogSearchCard key={index} className="h-52" imageClassName="w-[206px]" item={blog} />
          ))}
        </div>
      </div>
      <HorizontalScrollWrapper className="gap-x-4 lg:hidden">
        {blogs.map((blog, index) => {
          return <BlogSearchCard key={index} className="h-60 w-74 shrink-0" imageClassName="w-[206px]" item={blog} />
        })}
      </HorizontalScrollWrapper>
    </>
  )
}
