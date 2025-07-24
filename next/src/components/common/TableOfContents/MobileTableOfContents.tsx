import { useTranslation } from 'next-i18next'

import Accordion from '@/src/components/common/Accordion/Accordion'
import Content from '@/src/components/common/TableOfContents/Content'
import useHeadings from '@/src/components/common/TableOfContents/useHeadings'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-20086&t=ETyVhQnBPMeYXsm0-4
 * Based on OLO: https://github.com/bratislava/olo.sk/tree/master/next/src/components/common/TableOfContents
 */

const MobileTableOfContents = () => {
  const { t } = useTranslation()
  const headings = useHeadings()

  if (!headings?.length) {
    return null
  }

  return (
    <div className="border-b border-border-passive-primary">
      <Accordion title={t('TableOfContents.title')}>
        <Content headings={headings} />
      </Accordion>
    </div>
  )
}

export default MobileTableOfContents
