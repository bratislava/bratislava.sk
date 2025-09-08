import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'
import React from 'react'

import { InfoIcon } from '@/src/assets/icons'

type Props = {
  contentManager: string | null | undefined
}

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=17952-15675&m=dev
 */

const ContentManagedBy = ({ contentManager }: Props) => {
  const { t } = useTranslation()

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 max-lg:flex-col max-lg:text-center lg:py-6">
      <div className="flex items-center gap-3">
        <InfoIcon className="size-6 max-lg:hidden" />
        <Typography variant="p-small">
          {t('ContentManagedBy.message', { contentManager })}
        </Typography>
      </div>
      <Typography variant="p-default">
        {t('ContentManagedBy.copyright', { year: new Date().getFullYear(), contentManager })}
      </Typography>
    </div>
  )
}

export default ContentManagedBy
