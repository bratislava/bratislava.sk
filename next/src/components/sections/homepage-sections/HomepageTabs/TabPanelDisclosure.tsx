import React from 'react'
import { TabPanel } from 'react-aria-components'

import MLink from '@/src/components/common/MLink/MLink'
import { useTranslation } from '@/src/utils/useTranslation'

const TabPanelDisclosure = () => {
  const { t } = useTranslation()

  return (
    <TabPanel id="Disclosure">
      {/* FIXME Typography: Convert to use Typography. Issue: Different size and weight than typography have */}
      <div className="mt-14 flex flex-col gap-4 px-8 text-center text-h4">
        <div>{t('HomepageTabs.allInformationOnSite')}</div>
        <MLink
          variant="underlined"
          className="font-semibold"
          href="https://zverejnovanie.bratislava.sk"
          // eslint-disable-next-line i18next/no-literal-string
        >
          zverejnovanie.bratislava.sk
        </MLink>
      </div>
    </TabPanel>
  )
}

export default TabPanelDisclosure
