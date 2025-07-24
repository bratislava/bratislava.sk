import { useTranslation } from 'next-i18next'

import Accordion from '@/src/components/common/Accordion/Accordion'
import Content from '@/src/components/common/TableOfContents/Content'
import useHeadings from '@/src/components/common/TableOfContents/useHeadings'

const HEADER_OFFSET = 90

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=16846-20086&t=ETyVhQnBPMeYXsm0-4
 *
 */

const MobileTableOfContents = () => {
  const { t } = useTranslation()
  const headings = useHeadings()

  if (!headings?.length) {
    return null
  }

  return (
    <div className="border-b border-border-passive-primary">
      <Accordion title={t('serviceSection.headingsList')}>
        <Content headings={headings} headerOffset={HEADER_OFFSET} />
      </Accordion>
    </div>
  )
}

export default MobileTableOfContents
