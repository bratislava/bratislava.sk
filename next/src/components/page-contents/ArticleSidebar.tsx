import { Typography } from '@bratislava/component-library'

import { BratislavaLogoBWSvg, StarzLogoSvg } from '@/src/assets/images'
import Button from '@/src/components/common/Button/Button'
import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import CardImage from '@/src/components/common/Image/CardImage'
import MLink from '@/src/components/common/MLink/MLink'
import { useGeneralContext } from '@/src/components/providers/GeneralContextProvider'
import { ArticleEntityFragment } from '@/src/services/graphql'
import {
  isCityHallAdminGroup,
  isStarzAdminGroup,
  useGetMainAdminGroup,
} from '@/src/utils/adminGroupUtils'
import { generateImageSizes } from '@/src/utils/generateImageSizes'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  article: ArticleEntityFragment
  className?: string
}

const ArticleSidebar = ({ article, className }: Props) => {
  const { t } = useTranslation()

  const { general } = useGeneralContext()

  const { tags, inbaRelease, adminGroups } = article

  const authorAdminGroup = useGetMainAdminGroup(adminGroups)

  return (
    <div className={className}>
      <div className="flex flex-col gap-6 lg:gap-8">
        <div className="flex flex-col gap-4">
          <Typography variant="h5">{t('ArticleSidebar.author')}</Typography>
          <MLink
            variant="underlined"
            href={`${getLinkProps({ page: general?.newsPage }).href}?author=${authorAdminGroup.slug}`}
            className="flex items-center gap-4"
          >
            <div
              aria-hidden
              className="flex size-10 items-center justify-center rounded-md bg-background-passive-secondary text-content-passive-secondary"
            >
              {
                // TODO replace with a proper mapping when more admin groups are added
                isStarzAdminGroup(authorAdminGroup) ? (
                  <StarzLogoSvg className="size-8" />
                ) : isCityHallAdminGroup(authorAdminGroup) ? (
                  <BratislavaLogoBWSvg className="size-5" />
                ) : null
              }
            </div>
            <Typography variant="p-small">{authorAdminGroup.title}</Typography>
          </MLink>
        </div>
        {tags.length > 0 ? (
          <>
            <HorizontalDivider />
            <div className="flex flex-col gap-4">
              <Typography variant="h5">{t('ArticleSidebar.tags')}</Typography>
              <div className="flex flex-col gap-3">
                {tags.filter(isDefined).map((tag) => {
                  const { href: articlesPagePath, ...restLinkProps } = getLinkProps({
                    page: general?.newsPage,
                  })

                  return (
                    <Button
                      key={tag.documentId}
                      variant="link"
                      // TODO instead of hardcoding the query param key, take it from useArticlesFilters
                      href={`${articlesPagePath}?topic=${tag.slug}`}
                      {...restLinkProps}
                      className="flex-row-reverse gap-3"
                    >
                      {tag.title}
                    </Button>
                  )
                })}
              </div>
            </div>
          </>
        ) : null}
        {inbaRelease ? (
          <>
            <HorizontalDivider />
            <div className="wrapper-focus-ring relative flex items-center gap-6 rounded-sm">
              <CardImage
                imgSrc={inbaRelease.coverImage?.url}
                sizes={generateImageSizes({ default: '50vw', lg: '10vw' })}
                className="aspect-inba w-25 shrink-0 rounded-sm border"
              />
              <div className="flex flex-col gap-4">
                <Typography variant="h5">
                  {t('ArticleSidebar.articleIsPartOfInbaRelease')}
                </Typography>
                <Button
                  variant="link"
                  // TODO incorporate inbaRelease into getLinkProps
                  href={`${getLinkProps({ page: general?.inbaReleasesPage }).href}/${inbaRelease.slug}`}
                  stretched
                >
                  {t('ArticleSidebar.viewInbaRelease')}
                </Button>
              </div>
            </div>
          </>
        ) : null}
        {/* TODO related articles */}
      </div>
    </div>
  )
}

export default ArticleSidebar
