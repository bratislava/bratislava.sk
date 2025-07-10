import { i18n } from 'next-i18next'

import { ArticleCardProps } from '@/src/components/cards/ArticleCard'
import { InbaArticleCardEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'

export const transformInbaArticleProps = (article: NonNullable<InbaArticleCardEntityFragment>) => {
  const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

  const { title, slug, coverImage, publishedAt, perex, inbaTag } = article
  const tagTitle = inbaTag?.title

  const propsToReturn: ArticleCardProps = {
    title,
    linkProps: { children: i18n?.t('readMore'), href: `/inba/clanky/${slug}` },
    imgSrc: coverImage?.url,
    imgSizes: imageSizes,
    date: formatDate(publishedAt),
    tag: tagTitle,
    text: perex,
  }

  return propsToReturn
}
