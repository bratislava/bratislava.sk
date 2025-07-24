import { Typography } from '@bratislava/component-library'
import { useTranslation } from 'next-i18next'

import Content from '@/src/components/common/TableOfContents/Content'
import useHeadings from '@/src/components/common/TableOfContents/useHeadings'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-20086&t=ETyVhQnBPMeYXsm0-4
 * Based on OLO: https://github.com/bratislava/olo.sk/tree/master/next/src/components/common/TableOfContents
 */

const DesktopTableOfContents = () => {
  const { t } = useTranslation()
  const headings = useHeadings()

  if (!headings?.length) {
    return null
  }

  return (
    <div className="flex flex-col divide-y divide-border-passive-primary overflow-hidden rounded-lg border border-border-passive-primary">
      <div className="p-6">
        <Typography variant="h5">{t('TableOfContents.title')}</Typography>
      </div>
      <Content headings={headings} />
    </div>
  )
}

export default DesktopTableOfContents
