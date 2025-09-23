import React, { useMemo } from 'react'
import { Tab, TabList, Tabs } from 'react-aria-components'

import TabPanelDisclosure from '@/src/components/sections/homepage-sections/HomepageTabs/TabPanelDisclosure'
import TabPanelLatestNews from '@/src/components/sections/homepage-sections/HomepageTabs/TabPanelLatestNews'
import TabPanelOfficialBoard from '@/src/components/sections/homepage-sections/HomepageTabs/TabPanelOfficialBoard'
import TabPanelRoadClosures from '@/src/components/sections/homepage-sections/HomepageTabs/TabPanelRoadClosures'
import { useTranslation } from '@/src/utils/useTranslation'

export type HomepageTabsProps = {
  className?: string
}

const HomepageTabs = ({ className }: HomepageTabsProps) => {
  const { t } = useTranslation()

  const tabs = useMemo(() => {
    return [
      { id: 'LatestNews', label: t('HomepageTabs.tabs.LatestNews') },
      { id: 'OfficialBoard', label: t('HomepageTabs.tabs.OfficialBoard') },
      { id: 'RoadClosures', label: t('HomepageTabs.tabs.RoadClosures') },
      { id: 'Disclosure', label: t('HomepageTabs.tabs.Disclosure') },
    ]
  }, [t])

  return (
    <div className={className}>
      <Tabs>
        <TabList
          aria-label={t('HomepageTabs.aria.tabListName')}
          // margin and padding added to show full focus ring
          className="negative-x-spacing -my-1.5 scrollbar-hide flex grid-cols-4 gap-x-4 overflow-auto overflow-y-hidden py-1.5 md:grid"
        >
          {tabs.map(({ id, label }) => (
            <Tab
              key={id}
              id={id}
              className="base-focus-ring relative cursor-pointer py-3 text-center text-p-large whitespace-nowrap md:py-5 selected:font-semibold"
              data-cy={`homepage-tab-${id}`}
            >
              {({ isSelected }) => (
                <>
                  {label}
                  {isSelected && (
                    <div className="absolute bottom-0 left-1/2 w-full -translate-x-1/2 border-b-2 border-category-600 md:w-6/12 md:border-b-4" />
                  )}
                </>
              )}
            </Tab>
          ))}
        </TabList>

        <TabPanelLatestNews />
        <TabPanelOfficialBoard />
        <TabPanelRoadClosures />
        <TabPanelDisclosure />
      </Tabs>
    </div>
  )
}

export default HomepageTabs
