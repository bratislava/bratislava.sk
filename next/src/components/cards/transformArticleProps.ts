import { i18n } from 'next-i18next'

import { ArticleCardProps } from '@/src/components/cards/ArticleCard'
import { ArticleCardEntityFragment } from '@/src/services/graphql'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'

export const transformArticleProps = (article: NonNullable<ArticleCardEntityFragment>) => {
  const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

  const { title, slug, coverMedia, addedAt, perex, tag } = article
  const tagColor = tag?.pageCategory?.color
  const tagTitle = tag?.title

  const propsToReturn: ArticleCardProps = {
    title,
    linkProps: { children: i18n?.t('readMore'), href: `/spravy/${slug}` },
    imgSrc: coverMedia?.url,
    imgSizes: imageSizes,
    date: formatDate(addedAt),
    tag: tagTitle,
    text: perex,
    style: getCategoryColorLocalStyle({ color: tagColor }),
  }

  return propsToReturn
}
