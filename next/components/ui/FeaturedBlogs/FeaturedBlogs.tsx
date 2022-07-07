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
          <BlogSearchCard
            fullCardSizeImage
            className="h-full w-full"
            title={blogs[0].data?.attributes?.title}
            coverImage={blogs[0].data?.attributes?.coverImage?.data?.attributes?.url}
            published_at={blogs[0].data?.attributes?.publishedAt}
            tag={blogs[0].data?.attributes?.tag}
            slug={blogs[0].data?.attributes?.slug}
          />
        </div>
        <div className="flex flex-col gap-y-8 w-1/2">
          {blogs.slice(1, 3).map((blog, index) => (
            <BlogSearchCard
              key={index}
              className="h-52"
              imageClassName="w-[206px]"
              title={blog.data?.attributes?.title}
              coverImage={blog.data?.attributes?.coverImage?.data?.attributes?.url}
              published_at={blog.data?.attributes?.publishedAt}
              tag={blog.data?.attributes?.tag}
              slug={blog.data?.attributes?.slug}
            />
          ))}
        </div>
      </div>
      <HorizontalScrollWrapper className="lg:hidden gap-x-4">
        {blogs.map((blogCard, index) => {
          return (
            <BlogSearchCard
              key={index}
              imageClassName="w-[206px]"
              title={blogCard.data?.attributes?.title}
              coverImage={blogCard.data?.attributes?.coverImage?.data?.attributes?.url}
              published_at={blogCard.data?.attributes?.publishedAt}
              tag={blogCard.data?.attributes?.tag}
              slug={blogCard.data?.attributes?.slug}
              className="w-74 h-60 flex-shrink-0"
            />
          )
        })}
      </HorizontalScrollWrapper>
    </>
  )
}
