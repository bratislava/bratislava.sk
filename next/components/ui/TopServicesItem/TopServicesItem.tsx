import { TopServicesItemFragment } from '@bratislava/strapi-sdk-homepage'
import { Icon } from '@components/atoms/icon/Icon'
import Button from '@components/forms/simple-components/Button'
import { getCommonLinkProps } from '@utils/getCommonLinkProps'
import { useTranslations } from 'next-intl'

type TopNineItemProps = {
  topServicesItem: TopServicesItemFragment
}

export const TopServicesItem = ({ topServicesItem }: TopNineItemProps) => {
  const t = useTranslations('TopServices')
  const { icon, link } = topServicesItem

  const { children: label, ...linkProps } = getCommonLinkProps(link)

  return (
    <li className="relative flex gap-3 rounded-lg bg-white px-4 py-3 md:bg-transparent md:p-0 lg:gap-4">
      <div aria-hidden>
        <Icon iconName={icon} className="h-12 w-12 md:h-16 md:w-16" />
      </div>
      <div className="flex flex-col gap-1 lg:gap-2">
        <h3 className="text-h5">{label}</h3>
        <Button variant="black-link" stretched {...linkProps}>
          {t('learnMore')}
        </Button>
      </div>
    </li>
  )
}

export default TopServicesItem
