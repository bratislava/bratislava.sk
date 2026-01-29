import { Typography } from '@bratislava/component-library'
import { Fragment } from 'react'

import ArticleCard from '@/src/components/cards/ArticleCard'
import { transformArticleProps } from '@/src/components/cards/transformArticleProps'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import MLink from '@/src/components/common/MLink/MLink'
import { ArticleCardEntityFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { formatDate } from '@/src/utils/formatDate'
import { isDefined } from '@/src/utils/isDefined'

type Props = {
  leftArticle?: ArticleCardEntityFragment
  rightArticle?: ArticleCardEntityFragment
  otherArticles: ArticleCardEntityFragment[]
}

const LatestNews = ({ leftArticle, rightArticle, otherArticles }: Props) => {
  return (
    <div className="mt-14 hidden pb-8 lg:block">
      <div
        className={cn('grid grid-cols-3 gap-x-8', {
          'grid-cols-2': !rightArticle,
        })}
      >
        {[leftArticle, rightArticle].filter(isDefined).map((article) => (
          <ArticleCard key={article.slug} {...transformArticleProps(article)} />
        ))}

        <div className="border-active-default hidden flex-col gap-4 self-start rounded-lg border-1 bg-white p-6 lg:flex">
          {otherArticles.map((post, index) => {
            const { slug, title, addedAt } = post

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
  )
}

export default LatestNews
