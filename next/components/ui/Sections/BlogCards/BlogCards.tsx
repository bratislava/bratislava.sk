import { useUIContext } from '@bratislava/common-frontend-ui-context'
import { ArrowRight, ChevronRight } from '@assets/images'
import cx from 'classnames'
import { Carousel } from '../../Carousel/Carousel'
import { HorizontalCard } from '../../HorizontalCard/HorizontalCard'
import { HorizontalScrollWrapper } from '../../HorizontalScrollWrapper/HorizontalScrollWrapper'
import { VerticalCardButton } from '../../VerticalCardButton/VerticalCardButton'

export interface BlogCardsProps {
  className?: string
  shiftIndex?: number
  posts:
    | {
        imageSrc?: string | null | undefined
        title?: string | null | undefined
        url?: string | null | undefined
      }[]
    | undefined
}

export const BlogCards = ({ className, shiftIndex, posts = [] }: BlogCardsProps) => {
  const { Link: UILink } = useUIContext()
  return (
    <div className={cx(className)}>
      <div className="hidden xl:block">
        <Carousel
          shiftIndex={shiftIndex}
          items={posts.map((blogCard, i) => (
            <div key={i} className="box-content flex py-16">
              <HorizontalCard className="w-540 min-h-220" key={i} imageSrc={blogCard.imageSrc}>
                <p className='overflow-ellipsis overflow-hidden line-clamp-4'>{blogCard.title}</p>
                <UILink
                  className="mt-3 text-primary flex underline space-x-5 items-center group cursor-pointer h-6"
                  href={`blog${blogCard?.url}` || ''}
                >
                  <span className="hover:text-default font-semibold text-sm">Čítať viac</span>
                  <span className="group-hover:hidden">
                    <ChevronRight />
                  </span>
                  <span className="hidden group-hover:block">
                    <ChevronRight />
                  </span>
                </UILink>
              </HorizontalCard>
            </div>
          ))}
        />
      </div>

      <HorizontalScrollWrapper className={cx(className, 'xl:hidden py-10 pl-8 gap-x-4 -mx-8 px-8')}>
        {posts.map((blogCard, i) => (
          <HorizontalCard
            key={i}
            imageSrc={blogCard.imageSrc}
            className="flex-shrink-0 w-11/12"
            accessory={<VerticalCardButton />}
          >
            {blogCard.title}
          </HorizontalCard>
        ))}
      </HorizontalScrollWrapper>
    </div>
  )
}

export default BlogCards
