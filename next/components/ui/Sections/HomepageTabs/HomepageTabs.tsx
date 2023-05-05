import TabPanelDisclosure from '@components/ui/Sections/HomepageTabs/TabPanelDisclosure'
import TabPanelLatestNews from '@components/ui/Sections/HomepageTabs/TabPanelLatestNews'
import TabPanelOfficialBoard from '@components/ui/Sections/HomepageTabs/TabPanelOfficialBoard'
import TabPanelRoadClosures from '@components/ui/Sections/HomepageTabs/TabPanelRoadClosures'
import cx from 'classnames'
import { useTranslations } from 'next-intl'
import React, { useMemo } from 'react'
import { Tab, TabList, TabPanels, Tabs } from 'react-aria-components'

export interface HomepageTabsProps {
  className?: string
}

export const HomepageTabs = ({ className }: HomepageTabsProps) => {
  const t = useTranslations('HomepageTabs')

  const tabs = useMemo(() => {
    return [
      { id: 'LatestNews', label: t('tabs.LatestNews') },
      { id: 'OfficialBoard', label: t('tabs.OfficialBoard') },
      { id: 'RoadClosures', label: t('tabs.RoadClosures') },
      { id: 'Disclosure', label: t('tabs.Disclosure') },
    ]
  }, [t])

  return (
    <div className={cx(className)}>
      <Tabs>
        <TabList
          aria-label={t('aria.tabListName')}
          className="-mx-8 flex grid-cols-4 gap-x-4 overflow-auto overflow-y-hidden px-8 scrollbar-hide md:mx-auto md:grid"
        >
          {tabs.map(({ id, label }) => (
            <Tab
              key={id}
              id={id}
              className={({ isSelected }) =>
                cx(
                  'text-large-respo relative cursor-pointer whitespace-nowrap py-3 text-center md:py-5',
                  {
                    'font-semibold': isSelected,
                  },
                )
              }
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

        <TabPanels>
          <TabPanelLatestNews />
          <TabPanelOfficialBoard />
          <TabPanelRoadClosures />
          <TabPanelDisclosure />
        </TabPanels>
      </Tabs>
    </div>
  )
}

export default HomepageTabs
