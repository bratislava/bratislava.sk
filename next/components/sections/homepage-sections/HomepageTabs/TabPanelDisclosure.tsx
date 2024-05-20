import { useTranslations } from 'next-intl'
import React from 'react'
import { TabPanel } from 'react-aria-components'

import MLink from '@/components/common/MLink/MLink'

const TabPanelDisclosure = () => {
  const t = useTranslations('HomepageTabs')

  return (
    <TabPanel id="Disclosure">
      {/* FIXME Typography: Convert to use Typography. Issue: Different size and weight than typography have */}
      <div className="text-h4 mt-14 flex flex-col gap-4 px-8 text-center">
        <div>{t('allInformationOnSite')}</div>
        <MLink
          variant="underlined"
          className="font-semibold"
          href="https://zverejnovanie.bratislava.sk"
        >
          zverejnovanie.bratislava.sk
        </MLink>
      </div>
    </TabPanel>
  )
}

export default TabPanelDisclosure
