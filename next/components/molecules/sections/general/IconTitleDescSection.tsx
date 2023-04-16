import { IconTitleDescSectionFragment } from '@bratislava/strapi-sdk-homepage'
import { RentBenefits } from '@bratislava/ui-bratislava'
import { isPresent } from '@utils/utils'
import { useTranslations } from 'next-intl';

import React from 'react'

type IconTitleDescSectionProps = {
  section: IconTitleDescSectionFragment
}

const IconTitleDescSection = ({ section }: IconTitleDescSectionProps) => {
  const t = useTranslations();

  return (
    <RentBenefits
      title={section.title}
      list={section.list?.filter(isPresent)}
      linkLabel={t('readMore')}
      hasBackground={section.hasBackground ?? false}
    />
  )
}

export default IconTitleDescSection
