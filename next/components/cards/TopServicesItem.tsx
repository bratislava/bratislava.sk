import { Typography } from '@bratislava/component-library'

import Button from '@/components/common/Button/Button'
import Pictogram from '@/components/common/Pictogram/Pictogram'
import { TopServicesItemFragment } from '@/services/graphql'
import { getCommonLinkProps } from '@/utils/getCommonLinkProps'
import { useTranslation } from '@/utils/useTranslation'

type TopNineItemProps = {
  topServicesItem: TopServicesItemFragment
}

const TopServicesItem = ({ topServicesItem }: TopNineItemProps) => {
  const { t } = useTranslation()
  const { icon, link } = topServicesItem

  const { children: label, ...linkProps } = getCommonLinkProps(link)

  return (
    <div className="relative flex gap-3 rounded-lg bg-white px-4 py-3 md:bg-transparent md:p-0 lg:gap-4">
      <div aria-hidden>
        <Pictogram iconName={icon} className="h-12 w-12 md:h-16 md:w-16" />
      </div>
      <div className="flex flex-col gap-1 lg:gap-2">
        <Typography type="h3" size="h5">
          {label}
        </Typography>
        <Button variant="black-link" stretched {...linkProps}>
          {t('TopServices.learnMore')}
        </Button>
      </div>
    </div>
  )
}

export default TopServicesItem
