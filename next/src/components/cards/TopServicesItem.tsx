import { Typography } from '@bratislava/component-library'
import { useId } from 'react'

import Button from '@/src/components/common/Button/Button'
import Pictogram from '@/src/components/common/Pictogram/Pictogram'
import { TopServicesItemFragment } from '@/src/services/graphql'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useTranslation } from '@/src/utils/useTranslation'

type TopNineItemProps = {
  topServicesItem: TopServicesItemFragment
}

const TopServicesItem = ({ topServicesItem }: TopNineItemProps) => {
  const { t } = useTranslation()
  const titleId = useId()

  const { icon, link } = topServicesItem

  const { children: label, ...linkProps } = getLinkProps(link)

  return (
    <div className="relative flex gap-3 rounded-lg bg-white px-4 py-3 md:bg-transparent md:p-0 lg:gap-4">
      <div aria-hidden>
        <Pictogram iconName={icon} className="size-12 md:size-16" />
      </div>
      <div className="flex flex-col gap-1 lg:gap-2">
        <Typography id={titleId} variant="h5" as="h3">
          {label}
        </Typography>
        <Button variant="link" stretched {...linkProps} aria-labelledby={titleId}>
          {t('TopServices.learnMore')}
        </Button>
      </div>
    </div>
  )
}

export default TopServicesItem
