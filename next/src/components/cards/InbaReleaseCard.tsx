import { Button, Typography } from '@bratislava/component-library'
import { useId } from 'react'

import CardBase, { CardBaseProps } from '@/src/components/cards/CardBase'
import CardImage from '@/src/components/common/Image/CardImage'
import { InbaReleaseEntityFragment } from '@/src/services/graphql'
import { formatDate } from '@/src/utils/formatDate'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = {
  inbaRelease: InbaReleaseEntityFragment
  imgSizes?: string
} & CardBaseProps

const InbaReleaseCard = ({ inbaRelease, imgSizes, ...rest }: Props) => {
  const { t } = useTranslation()
  const titleId = useId()

  return (
    <CardBase variant="no-border" className="rounded-lg" {...rest}>
      <div className="flex grow flex-col justify-between gap-4 lg:gap-6">
        <CardImage
          imgSrc={inbaRelease.coverImage?.url}
          sizes={imgSizes}
          className="aspect-inba rounded-lg border"
        />

        <div className="flex grow flex-col gap-2">
          <Typography
            id={titleId}
            variant="h5"
            as="h3"
            className="line-clamp-3 group-hover:underline"
          >
            {inbaRelease.title}
          </Typography>
          {inbaRelease.releaseDate ? (
            <Typography variant="p-small">{formatDate(inbaRelease.releaseDate)}</Typography>
          ) : null}
        </div>

        <Button
          variant="link"
          href={getLinkProps({ inbaRelease }).href}
          stretched
          aria-labelledby={titleId}
        >
          {t('InbaRelease.releaseDetail')}
        </Button>
      </div>
    </CardBase>
  )
}

export default InbaReleaseCard
