import Button from '@components/forms/simple-components/Button'
import Iframe from '@components/ui/Iframe/Iframe'
import { useLocale } from 'next-intl'
import React from 'react'
import { TabPanel } from 'react-aria-components'

import { getCommonLinkProps } from '@/utils/getCommonLinkProps'
import { useHomepageContext } from '@/utils/homepageContext'

const TabPanelRoadClosures = () => {
  const locale = useLocale()

  const { homepage } = useHomepageContext()
  const { tabs } = homepage?.attributes ?? {}

  return (
    <TabPanel id="RoadClosures">
      <div className="mt-8 pb-8 lg:mt-14">
        <Iframe
          url={`https://cdn-api.bratislava.sk/static-pages/closures-and-restrictions-map/index.html?lang=${locale}`}
          iframeWidth="container"
          iframeHeight="620"
          fullHeight={false}
          allowFullscreen
          allowGeolocation
        />
      </div>

      {tabs?.roadClosuresPageLink ? (
        <div className="flex justify-center">
          <Button variant="category-outline" {...getCommonLinkProps(tabs.roadClosuresPageLink)} />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelRoadClosures
