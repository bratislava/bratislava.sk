import { Typography } from '@bratislava/component-library'
import { TabPanel } from 'react-aria-components'

import BlogPostCard from '@/src/components/cards/BlogPostCard'
import Button from '@/src/components/common/Button/Button'
import ResponsiveCarousel from '@/src/components/common/Carousel/ResponsiveCarousel'
import MLink from '@/src/components/common/MLink/MLink'
import Tag from '@/src/components/common/Tag/Tag'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getCommonLinkProps } from '@/src/utils/getCommonLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

const imageSizes = generateImageSizes({ default: '50vw', lg: '33vw' })

const TabPanelLatestNews = () => {
  const { t } = useTranslation()

  const { homepage, latestArticles } = useHomepageContext()
  const { tabs } = homepage?.attributes ?? {}
  const { leftArticle, rightArticle } = tabs ?? {}
  const latestArticlesFiltered =
    latestArticles
      ?.filter(isDefined)
      .filter(
        (article) => article.id !== leftArticle?.data?.id && article.id !== rightArticle?.data?.id,
      )
      .slice(0, 4) ?? []

  const allLatestArticles =
    [leftArticle?.data, rightArticle?.data, ...latestArticlesFiltered]
      .filter(isDefined)
      .slice(0, 6) ?? []

  return (
    <TabPanel id="LatestNews">
      <ResponsiveCarousel
        className="lg:hidden"
        items={allLatestArticles.map((article) => {
          const { title, slug, coverMedia, addedAt, tag } = article.attributes ?? {}
          const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
          const tagTitle = tag?.data?.attributes?.title

          return (
            <BlogPostCard
              key={article.id}
              style={getCategoryColorLocalStyle({ color: tagColor })}
              variant="no-border"
              date={formatDate(addedAt)}
              tag={tagTitle ?? undefined}
              title={title ?? ''}
              linkProps={{ children: t('HomepageTabs.readMore'), href: `/spravy/${slug}` }}
              imgSrc={coverMedia?.data?.attributes?.url}
              imgSizes={imageSizes}
            />
          )
        })}
      />
      <div className="mt-14 hidden pb-8 lg:block">
        <div className="grid grid-cols-3 gap-x-8">
          {[leftArticle?.data, rightArticle?.data].filter(isDefined).map((article) => {
            const { title, slug, coverMedia, addedAt, tag, perex } = article.attributes ?? {}
            const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color
            const tagTitle = tag?.data?.attributes?.title

            return (
              <BlogPostCard
                key={article.id}
                style={getCategoryColorLocalStyle({ color: tagColor })}
                variant="no-border"
                date={formatDate(addedAt)}
                tag={tagTitle ?? undefined}
                title={title ?? ''}
                linkProps={{ children: t('HomepageTabs.readMore'), href: `/spravy/${slug}` }}
                imgSrc={coverMedia?.data?.attributes?.url}
                imgSizes={imageSizes}
                text={perex ?? undefined}
              />
            )
          })}

          <div className="hidden flex-col gap-6 lg:flex">
            {latestArticlesFiltered.map((post, index) => {
              const { tag, slug, title } = post.attributes ?? {}
              const tagColor = tag?.data?.attributes?.pageCategory?.data?.attributes?.color

              return (
                <div
                  // eslint-disable-next-line react/no-array-index-key
                  key={index}
                  className="relative"
                  style={getCategoryColorLocalStyle({ color: tagColor })}
                >
                  {tag?.data?.attributes?.title && (
                    <div className="mb-3">
                      <Tag text={tag.data.attributes.title} size="small" isColored />
                    </div>
                  )}
                  <MLink
                    href={`/spravy/${slug}`}
                    stretched
                    variant="underlineOnHover"
                    className="line-clamp-3"
                  >
                    <Typography type="h3" size="h5">
                      {title}
                    </Typography>
                  </MLink>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {tabs?.newsPageLink ? (
        <div className="flex justify-center">
          <Button variant="outline" hasLinkIcon {...getCommonLinkProps(tabs?.newsPageLink)} />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelLatestNews
