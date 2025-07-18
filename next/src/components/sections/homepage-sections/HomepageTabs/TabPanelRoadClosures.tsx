import { TabPanel } from 'react-aria-components'

import Button from '@/src/components/common/Button/Button'
import Iframe from '@/src/components/common/Iframe/Iframe'
import { useHomepageContext } from '@/src/components/providers/HomepageContextProvider'
import { getLinkProps } from '@/src/utils/getLinkProps'
import { useLocale } from '@/src/utils/useLocale'

const TabPanelRoadClosures = () => {
  const locale = useLocale()

  const { homepage } = useHomepageContext()
  const { tabs } = homepage ?? {}

  return (
    <TabPanel id="RoadClosures">
      <div className="mt-8 pb-8 lg:mt-14">
        <Iframe
          url={`https://static-pages.s3.bratislava.sk/closures-and-restrictions-map/index.html?lang=${locale}`}
          iframeWidth="container"
          iframeHeight="620"
          fullHeight={false}
          allowFullscreen
          allowGeolocation
        />
      </div>

      {tabs?.roadClosuresPageLink ? (
        <div className="flex justify-center">
          <Button variant="outline" {...getLinkProps(tabs.roadClosuresPageLink)} />
        </div>
      ) : null}
    </TabPanel>
  )
}

export default TabPanelRoadClosures
