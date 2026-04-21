import { i18n } from 'next-i18next'

import { ArticleCardProps } from '@/src/components/cards/ArticleCard'
import { ArticleCardEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'

export const transformArticleProps = (
  article: NonNullable<ArticleCardEntityFragment>,
  options?: { withText?: boolean },
) => {
  const imageSizes = generateImageSizes({ default: '100vw', md: '50vw', lg: '33vw' })

  const { withText = true } = options ?? {}

  const { title, coverMedia, addedAt, perex } = article

  const propsToReturn: ArticleCardProps = {
    title,
    linkProps: { children: i18n?.t('readMore'), href: getLinkProps({ article }).href },
    imgSrc: coverMedia?.url,
    imgSizes: imageSizes,
    date: formatDate(addedAt),
    ...(withText && { text: perex }),
  }

  return propsToReturn
}
