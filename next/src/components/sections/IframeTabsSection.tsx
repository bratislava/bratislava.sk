import { Typography } from '@bratislava/component-library'
import slugify from '@sindresorhus/slugify'
import { parseAsString, useQueryState } from 'nuqs'
import { Key, Tab, TabList, TabPanel, Tabs } from 'react-aria-components'

import HorizontalDivider from '@/src/components/common/Divider/HorizontalDivider'
import Iframe from '@/src/components/common/Iframe/Iframe'
import SectionContainer from '@/src/components/layouts/SectionContainer'
import SectionHeader from '@/src/components/layouts/SectionHeader'
import { IframeTabsSectionFragment } from '@/src/services/graphql'
import cn from '@/src/utils/cn'
import { getCategoryColorLocalStyle } from '@/src/utils/colors'
import { isDefined } from '@/src/utils/isDefined'
import { useTranslation } from '@/src/utils/useTranslation'

type Props = { section: IframeTabsSectionFragment }

const DEFAULT_IFRAME_HEIGHT = '400px'

/**
 * Figma: https://www.figma.com/design/17wbd0MDQcMW9NbXl6UPs8/DS--Component-library?node-id=25997-18423&t=jsOAk2fAFkJeDwuF-4
 */

const IframeTabsSection = ({ section }: Props) => {
  const { t } = useTranslation()
  const { title, text, iframesHeight, iframes, titleLevelIframeTabsSection: titleLevel } = section

  // Add slugs to tabs based on label, so url query params are readable
  const tabs = iframes.filter(isDefined).map((iframe) => ({
    ...iframe,
    slug: slugify(iframe.label),
  }))

  const [selectedTabSlug, setSelectedTabSlug] = useQueryState(
    'iframeTab',
    parseAsString.withDefault(tabs[0]?.slug ?? ''),
  )

  // Fall back to the first tab when the query param doesn't match any known tab.
  const selectedTab = tabs.find((tab) => tab.slug === selectedTabSlug) ?? tabs.at(0)

  const handleSelectionChange = (key: Key) => {
    void setSelectedTabSlug(key.toString())
  }

  const resolvedIframeHeight = iframesHeight ?? selectedTab?.iframeHeight ?? DEFAULT_IFRAME_HEIGHT

  return (
    <SectionContainer>
      <div className="flex flex-col gap-4 lg:gap-6">
        <SectionHeader title={title} text={text} titleLevel={titleLevel} />

        {tabs.length ? (
          <Tabs
            selectedKey={selectedTab?.slug}
            onSelectionChange={handleSelectionChange}
            className="flex flex-col gap-4 lg:gap-6"
          >
            <TabList
              aria-label={t('IframeTabsSection.tabList.aria')}
              className="flex flex-wrap gap-2 lg:gap-3"
            >
              {tabs.map((tab) => (
                <Tab
                  key={tab.id}
                  id={tab.slug}
                  style={getCategoryColorLocalStyle({ category: 'grey' })}
                  className={cn(
                    'base-focus-ring',
                    'flex shrink-0 cursor-pointer items-center rounded-lg border px-3 py-1.5 lg:px-4 lg:py-2.5',
                    'bg-background-passive-base text-content-passive-secondary',
                    'hover:border-border-active-hover',
                    'selected:border-background-active-primary-pressed selected:bg-background-active-primary-pressed selected:text-content-active-primary-inverted-default',
                  )}
                >
                  <Typography variant="p-small">{tab.label}</Typography>
                </Tab>
              ))}
            </TabList>

            {tabs.map((tab) => (
              <TabPanel
                key={tab.id}
                id={tab.slug}
                // Force mount all tabs, so all iframes are loaded when mounted, and stay mounted and loaded on tab change.
                // According to docs, tabs must be styled (hidden) manually, when using shouldForceMount
                // https://react-aria.adobe.com/Tabs#tabpanel
                shouldForceMount
                className={cn('flex flex-col', { hidden: tab.slug !== selectedTab?.slug })}
              >
                <HorizontalDivider />
                <Iframe
                  url={tab.url}
                  iframeHeight={resolvedIframeHeight}
                  iframeTitle={tab.iframeTitle}
                  hasBorder={false}
                  allowGeolocation={tab.allowGeolocation}
                />
              </TabPanel>
            ))}
          </Tabs>
        ) : null}
      </div>
    </SectionContainer>
  )
}

export default IframeTabsSection
