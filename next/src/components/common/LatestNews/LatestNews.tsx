import { Typography } from '@bratislava/component-library'
import { Fragment } from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import MLink from '@/src/components/common/MLink/MLink'
import { ArticleCardEntityFragment, CommonLinkFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { formatDate } from '@/src/utils/formatDate'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  leftArticle?: ArticleCardEntityFragment | null
  rightArticle?: ArticleCardEntityFragment | null
  otherArticles: ArticleCardEntityFragment[]
  newsPageLink: CommonLinkFragment | null | undefined
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=19274-19792&t=oEQ6SCdzjktLhq9o-4
 */

const LatestNews = ({ leftArticle, rightArticle, otherArticles, newsPageLink }: Props) => {
  const allLatestArticles =
    [leftArticle, rightArticle, ...otherArticles].filter(isDefined).slice(0, 6) ?? []

  return (
    <div className="flex flex-col gap-y-14">
      <ResponsiveCarousel
        className="lg:hidden"
        hasVerticalPadding={false}
        items={allLatestArticles.map((article) => (
          <ArticleCard key={article.slug} {...transformArticleProps(article)} />
        ))}
      />
      <div className="max-lg:hidden">
        <div
          className={cn('grid grid-cols-3 gap-x-8', {
            'grid-cols-2': !rightArticle,
          })}
        >
          {[leftArticle, rightArticle].filter(isDefined).map((article) => (
            <ArticleCard key={article.slug} {...transformArticleProps(article)} />
          ))}

          <div className="flex-col gap-4 self-start rounded-lg border border-border-passive-primary bg-white p-6 lg:flex">
            {otherArticles.map((article, index) => {
              const { slug, title, addedAt } = article

              return (
                <Fragment key={index}>
                  {index > 0 && <HorizontalDivider />}
                  <div
                    // margin and padding serve to display focus ring better
                    className="wrapper-focus-ring relative -m-1 flex flex-col gap-2 rounded-sm p-1"
                  >
                    <Typography variant="p-small">{formatDate(addedAt)}</Typography>
                    <MLink
                      href={`/spravy/${slug}`}
                      stretched
                      variant="underlineOnHover"
                      className="line-clamp-3"
                    >
                      <Typography variant="h6" as="h3">
                        {title}
                      </Typography>
                    </MLink>
                  </div>
                </Fragment>
              )
            })}
          </div>
        </div>
      </div>
      {newsPageLink ? (
        <div className="flex justify-center">
          <Button variant="outline" {...getLinkProps(newsPageLink)} />
        </div>
      ) : null}
    </div>
  )
}

export default LatestNews
