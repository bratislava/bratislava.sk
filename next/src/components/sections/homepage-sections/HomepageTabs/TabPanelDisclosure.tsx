import { Typography } from '@bratislava/component-library'
import React from 'react'
import { TabPanel } from 'react-aria-components'

import CardBase from '@/src/components/cards/CardBase'
import MLink from '@/src/components/common/MLink/MLink'
import { useTranslation } from '@/src/utils/useTranslation'

const TabPanelDisclosure = () => {
  const { t } = useTranslation()

  return (
    <TabPanel id="Disclosure">
      <CardBase className="mx-auto mt-8 mb-16 flex flex-col gap-1 rounded-xl bg-background-passive-base px-4 py-8 text-center lg:w-fit lg:gap-4 lg:px-24">
        <Typography variant="p-large">{t('HomepageTabs.allInformationOnSite')}</Typography>

        <MLink
          variant="underlined"
          className="font-semibold wrap-break-word"
          href="https://zverejnovanie.bratislava.sk"
          stretched
        >
          {/* eslint-disable-next-line i18next/no-literal-string */}
          <Typography variant="p-large">zverejnovanie.bratislava.sk</Typography>
        </MLink>
      </CardBase>
    </TabPanel>
  )
}

export default TabPanelDisclosure
